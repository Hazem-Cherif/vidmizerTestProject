<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert ;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 * @UniqueEntity(fields={"firstName", "lastName"})
 * @UniqueEntity("phoneNumbre")
 */
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=3)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="lastName is required")
     * @Assert\Length(min=3)
     */
    private $lastName;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="phoneNumbre is required")
     * @Assert\Length(min=10)
     */
    private $phoneNumbre;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="region is required")
     * @Assert\Length(min=3)
     */
    private $region;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="user is required")
     */
    private $userEmail;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoneNumbre(): ?int
    {
        return $this->phoneNumbre;
    }

    public function setPhoneNumbre(int $phoneNumbre): self
    {
        $this->phoneNumbre = $phoneNumbre;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getUserEmail(): ?string
    {
        return $this->userEmail;
    }

    public function setUserEmail(string $userEmail): self
    {
        $this->userEmail = $userEmail;

        return $this;
    }
}
