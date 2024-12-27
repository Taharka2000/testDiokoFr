import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';


import './Home.css';
import AccountForm from '../components/ExploreContainer';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
       <AccountForm/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
