import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { 
  }

  public insertar(coleccion, doc, datos) {
    return this.angularFirestore.collection(coleccion).doc(doc).set(datos);
  } 
 
  public consultar(coleccion) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

  public borrar(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).delete();
  }

  public actualizar(coleccion, documentId, datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).set(datos);
   }
   
   public consultarPorId(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).snapshotChanges();
  }
  
  public update(coleccion, documentId,datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).update(datos);
  }

  public get(coleccion) {
    return this.angularFirestore.collection(coleccion).valueChanges();
  }

}