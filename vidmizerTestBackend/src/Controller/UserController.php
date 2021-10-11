<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/users")
 */
class UserController extends AbstractController
{
    /**
     * @Route(name="get_users", methods={"GET"})
     */
    public function getAllUsers(UserRepository $userRepository)
    {
                      
        return $this->json($userRepository->findAll());
       
    }
    /**
     * @Route("/{id}", name="get_user_by_id", methods={"GET"})
     */
    public function getUserById(User $user)
    {
                      
        return $this->json($user);
       
    }


    /**
     * @Route("/{id}", name="update_user", methods={"PUT"})
     */
    public function updateUser(User $user, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $jsonRecu = $request->getContent();
        try{
            $user = $serializer->deserialize($jsonRecu, User::class , 'json',[AbstractNormalizer::OBJECT_TO_POPULATE => $user]);
            $errors = $validator->validate($user);
            
            if(count($errors) > 0){
                return $this->json($errors);
            }
            
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json($user);
        
        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => $erruer->getMessage()
            ]);
                               
        }
    }

    /**
     * @Route("/{id}", name="delete_user", methods={"DELETE"})
     */
    public function deleteUser(User $user, EntityManagerInterface $entityManager)
    {
       $entityManager->remove($user);
       $entityManager->flush();
       
       return $this->json(null,200);
    }

    /**
     * @Route("/register",name="register_user", methods={"POST"})
     */
    public function registerUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $jsonRecu = $request->getContent();
        try{
            $user = $serializer->deserialize($jsonRecu, User::class , 'json');
            $errors = $validator->validate($user);
            
            if(count($errors) > 0){
                return $this->json($errors);
            }
            
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json($user);
        
        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => $erruer->getMessage()
            ]);
                               
        }
    }

    /**
     * @Route("/login", name="login_user", methods={"POST"})
     */
    public function loginUser(Request $request,UserRepository $userRepository)
    {
       try{
            $content = json_decode($request->getContent(), true);
            $result = $this->json($userRepository->findOneByEmailAndPassword($content['email'] , $content['password']));
            return $result;

        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => "$erruer->getMessage()"
            ]);
                               
        }
    }
    /**
     * @Route("/checkuser", name="check_user", methods={"POST"})
     */
    public function checkuser(Request $request,UserRepository $userRepository)
    {
       try{
            $content = json_decode($request->getContent(), true);
            $result = $this->json($userRepository->findOneByEmail($content['email']));
            return $result;

        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => "$erruer->getMessage()"
            ]);
                               
        }
    }
}
