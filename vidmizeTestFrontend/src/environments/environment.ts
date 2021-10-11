// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACK_END_USER_LOGIN: 'http://localhost:8000/users/login',
  BACK_END_USER_REGISTER: 'http://localhost:8000/users/register',
  BACK_END_USER_CHECK: 'http://localhost:8000/users/checkuser',
  API_GEO_FRANCE: 'https://geo.api.gouv.fr/regions',
  BACK_END_CONTACTS: 'http://localhost:8000/contacts',
  BACK_END_CONTACTS_USER: 'http://localhost:8000/contacts/user',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
