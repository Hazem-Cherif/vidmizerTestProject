import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../interfaces/contact';
import { Region } from '../interfaces/region';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addressBookForm: FormGroup
  regions: Region[] = [];
  contact: Contact;
  contacts: Contact[];
  userName: string
  regionCharger = false
  contactCharger = false
  err1 = false
  err2 = false
  searchText
  reload = false

  constructor(private contactService: ContactService, private router: Router) {

  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
    this.getAllRegions();
  }


  getAllRegions() {
    //getting all region from geo.api.gouv.fr
    this.contactService.getAllRegions().subscribe(data => {
      this.regions = data
      this.regionCharger = true
      if (this.regionCharger) {
        //geting contact list by user
        this.contactService.getAllcontactsByUser(localStorage.getItem('email')).subscribe(data => {
          this.contacts = data
          this.contactCharger = true
          this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
          if (this.contactCharger) {
            this.addressForm()
          }
        })
      }
    })

  }

  addressForm() {
    this.addressBookForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumbre: new FormControl('', [Validators.required,Validators.minLength(10)]),
      userEmail: new FormControl(localStorage.getItem('email'), [Validators.required]),
      region: new FormControl(''),
    });
  }

  async addContact() {
    //if contact list is empty add the new contact
    if (this.contacts.length == 0) {
      this.addressBookForm.value.phoneNumbre = Number(this.addressBookForm.value.phoneNumbre)
      await this.contactService.addContact(this.addressBookForm.value).subscribe(() => {
        this.contacts
        this.reload = true
        if (this.reload) {
          this.ngOnInit();
        }

      });
    }
    // if contact list is not empty verify the consitions
    for (const i of this.contacts) {
      //if first name + last name already exist 
      if (i.firstName == this.addressBookForm.value.firstName && i.lastName == this.addressBookForm.value.lastName) {
        this.err1 = true;
        break;
      }
      //if phone numbre already exist 
      else if (i.phoneNumbre == this.addressBookForm.value.phoneNumbre) {
        this.err2 = true;
        break;
      }
      else {
        this.addressBookForm.value.phoneNumbre = Number(this.addressBookForm.value.phoneNumbre)
        await this.contactService.addContact(this.addressBookForm.value).subscribe(() => {
          this.contacts
          this.reload = true
          if (this.reload) {
            this.ngOnInit();
          }
        });
      }
    }
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(() => this.contacts = this.contacts.filter(cont => cont.id != id));

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
