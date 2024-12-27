import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
} from '@ionic/react';
import './ExploreContainer.css';

const AccountForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idCard, setIdCard] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIdCard(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (idCard) formData.append('idCard', idCard);

    try {
      const response = await fetch('http://192.168.1.17:4000/api/register', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSuccessMessage('Inscription réussie !');
      } else {
        console.error('Erreur lors de l\'inscription');
        setSuccessMessage('Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur de réseau:', error);
      setSuccessMessage('Erreur de réseau. Veuillez réessayer plus tard.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="custom-title">Créer un compte</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding custom-background">
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
              <IonCard className="custom-card">
                <IonCardContent>
                  <form onSubmit={handleSubmit}>
                    <IonItem className="custom-item">
                      <IonLabel position="floating" className="custom-label">
                        Nom complet
                      </IonLabel>
                      <IonInput
                        type="text"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
                        required
                      />
                    </IonItem>

                    <IonItem className="custom-item">
                      <IonLabel position="floating" className="custom-label">
                        Email
                      </IonLabel>
                      <IonInput
                        type="email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                        required
                      />
                    </IonItem>

                    <IonItem className="custom-item">
                      <IonLabel position="floating" className="custom-label">
                        Mot de passe
                      </IonLabel>
                      <IonInput
                        type="password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        required
                      />
                    </IonItem>

                    <IonItem className="custom-item">
                      <IonLabel className="custom-label">Carte d'identité</IonLabel>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        className="custom-input"
                      />
                    </IonItem>

                    <IonButton expand="block" type="submit" className="custom-button">
                      Créer un compte
                    </IonButton>
                  </form>

                  {successMessage && (
                    <IonText color={successMessage === 'Inscription réussie !' ? 'success' : 'danger'}>
                      <p className="custom-message">{successMessage}</p>
                    </IonText>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AccountForm;



///
// import React, { useState } from 'react';
// import {
//   IonButton,
//   IonContent,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCard,
//   IonCardContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonText,
// } from '@ionic/react';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// const AccountForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [idCard, setIdCard] = useState<File | null>(null);
//   const [photoPath, setPhotoPath] = useState<string | null>(null); // Pour stocker la photo prise avec la caméra
//   const [successMessage, setSuccessMessage] = useState<string>(''); // Message de succès

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setIdCard(event.target.files[0]);
//     }
//   };

//   const openCamera = async () => {
//     try {
//       const photo = await Camera.getPhoto({
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera, // Prendre une photo directement
//         quality: 90,
//       });

//       if (photo.webPath) {
//         setPhotoPath(photo.webPath); // Chemin de la photo
//         const blob = await fetch(photo.webPath).then((res) => res.blob()); // Convertir en blob pour l'envoi
//         const file = new File([blob], 'photo.jpg', { type: blob.type });
//         setIdCard(file); // Définit la photo comme fichier
//       }
//     } catch (error) {
//       console.error('Erreur lors de la prise de photo :', error);
//       setSuccessMessage('Erreur lors de l\'utilisation de la caméra.');
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (idCard) formData.append('idCard', idCard);

//     try {
//       const response = await fetch('http://192.168.1.17:4000/api/register', {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setSuccessMessage('Inscription réussie !');
//       } else {
//         setSuccessMessage('Une erreur est survenue lors de l\'inscription.');
//       }
//     } catch (error) {
//       console.error('Erreur de réseau:', error);
//       setSuccessMessage('Erreur de réseau. Veuillez réessayer plus tard.');
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Création de compte</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <IonGrid fixed>
//           <IonRow className="ion-justify-content-center">
//             <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
//               <IonCard>
//                 <IonCardContent>
//                   <form onSubmit={handleSubmit}>
//                     <IonItem className="ion-margin-bottom">
//                       <IonLabel position="floating">Nom complet</IonLabel>
//                       <IonInput
//                         type="text"
//                         placeholder="Entrez votre nom"
//                         value={name}
//                         onIonChange={(e) => setName(e.detail.value!)}
//                         required
//                       />
//                     </IonItem>

//                     <IonItem className="ion-margin-bottom">
//                       <IonLabel position="floating">Email</IonLabel>
//                       <IonInput
//                         type="email"
//                         placeholder="Entrez votre email"
//                         value={email}
//                         onIonChange={(e) => setEmail(e.detail.value!)}
//                         required
//                       />
//                     </IonItem>

//                     <IonItem className="ion-margin-bottom">
//                       <IonLabel position="floating">Mot de passe</IonLabel>
//                       <IonInput
//                         type="password"
//                         placeholder="Entrez votre mot de passe"
//                         value={password}
//                         onIonChange={(e) => setPassword(e.detail.value!)}
//                         required
//                       />
//                     </IonItem>

//                     {/* Bouton pour prendre une photo */}
//                     <IonButton expand="block" onClick={openCamera} className="ion-margin-bottom">
//                       Prendre une photo
//                     </IonButton>

//                     {/* Champ de fichier pour télécharger une pièce d'identité */}
//                     <IonItem className="ion-margin-bottom">
//                       <IonLabel position="floating">Télécharger un fichier</IonLabel>
//                       <input
//                         type="file"
//                         accept="image/*,application/pdf"
//                         onChange={handleFileChange}
//                         className="ion-margin-top"
//                         style={{
//                           marginTop: '16px',
//                           marginBottom: '8px',
//                           width: '100%',
//                         }}
//                       />
//                     </IonItem>

//                     {/* Affichage de la photo capturée */}
//                     {photoPath && (
//                       <IonCard>
//                         <img src={photoPath} alt="Photo capturée" />
//                       </IonCard>
//                     )}

//                     <div className="ion-padding-top">
//                       <IonButton expand="block" type="submit">
//                         Créer un compte
//                       </IonButton>
//                     </div>
//                   </form>

//                   {/* Affichage du message de succès ou d'erreur */}
//                   {successMessage && (
//                     <IonText color={successMessage === 'Inscription réussie !' ? 'success' : 'danger'}>
//                       <p>{successMessage}</p>
//                     </IonText>
//                   )}
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AccountForm;
