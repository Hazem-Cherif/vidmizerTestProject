<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/contacts")
 */
class ContactController extends AbstractController
{
    /**
     * @Route(name="get_contacts", methods={"GET"})
     */
    public function getAllContacts(ContactRepository $contactRepository)
    {
                      
        return $this->json($contactRepository->findAll());
       
    }
    /**
     * @Route("/{id}", name="get_contact_by_id", methods={"GET"})
     */
    public function getContactById(Contact $contact)
    {
                      
        return $this->json($contact);
       
    }


    /**
     * @Route("/{id}", name="update_contact", methods={"PUT"})
     */
    public function updateContact(Contact $contact, Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $jsonRecu = $request->getContent();
        try{
            $contact = $serializer->deserialize($jsonRecu, Contact::class , 'json',[AbstractNormalizer::OBJECT_TO_POPULATE => $contact]);
            $errors = $validator->validate($contact);
            
            if(count($errors) > 0){
                return $this->json($errors);
            }
            
            $entityManager->persist($contact);
            $entityManager->flush();

            return $this->json($contact);
        
        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => $erruer->getMessage()
            ]);
                               
        }
    }

    /**
     * @Route("/{id}", name="delete_contact", methods={"DELETE"})
     */
    public function deleteUser(Contact $contact, EntityManagerInterface $entityManager)
    {
       $entityManager->remove($contact);
       $entityManager->flush();
       
       return $this->json(null,200);
    }
     /**
     * @Route(name="register_contact", methods={"POST"})
     */
    public function registerContact(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $jsonRecu = $request->getContent();
        try{
            $contact = $serializer->deserialize($jsonRecu, Contact::class , 'json');
            $errors = $validator->validate($contact);
            
            if(count($errors) > 0){
                return $this->json($errors);
            }
            $entityManager->persist($contact);
            $entityManager->flush();

            return $this->json($contact);
        
        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => $erruer->getMessage()
            ]);
                               
        }
    }

     /**
     * @Route("/user" ,name="get_contacts_ByUser", methods={"POST"})
     */
    public function getAllContactsByUser(Request $request,ContactRepository $contactRepository)
    {
                      
        try{
            $content = json_decode($request->getContent(), true);
            $result = $this->json($contactRepository->findByUserContacts($content['email']));
            return $result;

        } catch (NotEncodableValueException $erruer) {
            return $this->json([
                'status' => 400,
                'message' => "$erruer->getMessage()"
            ]);
                               
        }
       
    }
}
