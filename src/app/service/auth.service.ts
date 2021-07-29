import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore"
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.afs.doc<User>('user/${user.uid}').valueChanges();
        }
        return of(null);
      })
    )
  }

  async loginGoogle(): Promise<User>{
    try{
      const {user} = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error->',error)
    }
  }

  async isEmailVerified(user:User){
    return user.emailVerified === true ? true :false;
  }

  async logout(): Promise<void>{
    try{
      await this.afAuth.signOut();
    }
    catch(error){
      console.log('Error->',error)
    }
  }

  private updateUserData(user: User){
    const userRef:AngularFirestoreDocument<User> = this.afs.doc('user/${user.uid');
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, {merge:true})
    
  }


}
