import React, { useState, useEffect } from 'react';
import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import menu1 from "../assets/images/menu1.png";
import vector from"../assets/svg/Vector.svg";
import { cart, notifications } from 'ionicons/icons';
import '../assets/css/Menu.css';
import menusp1 from "../assets/images/menusp1.png";
import menusp2 from "../assets/images/menusp2.png";
import CustomButton from '../components/Button';

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Chicken");
  const [dishes, setDishes] = useState<Dish[]>([]);
  

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://biryani-darbar-server.vercel.app/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch dishes when active category changes
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`https://biryani-darbar-server.vercel.app/dishes/category/${activeCategory}`);
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, [activeCategory]);

  interface Dish {
    image: string;
    dishName?: string;
    name?: string;
    description?: string;
    price: number;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='danger'>
          <IonTitle className='justify text-center'>Menu</IonTitle>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon icon={cart} />
            </IonButton>
            <IonButton>
              <IonIcon icon={notifications} />
              <IonBadge slot="end"></IonBadge>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <img src={menu1} style={{ borderRadius: '8px',marginTop:'10px',marginRight:'10px',marginLeft:'10px'}} alt="Menu" />
        <p style={{ fontWeight: 'bold',marginLeft:'15px' }}>Special Offers</p>
        <div style={{display:'flex' ,gap:'9px',width:'45%',marginLeft:'10px'}}>
        <img src={menusp1}/>
        <img src={menusp2}/>
</div> 

        <p style={{ fontWeight: 'bold' ,marginLeft:'15px'}}>List of dishes</p>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto',marginLeft:'1.25rem'}}>
          {categories.map((category) => (
            <div>
            <CustomButton
              key={category}
              onClick={() => setActiveCategory(category)}
              color={category === activeCategory ? 'primary' : 'medium'}
            >
              <IonIcon icon={vector}></IonIcon>
            </CustomButton>
            <div style={{fontSize:'16px', textAlign: 'center' }}>{category}</div>
            </div>

          )
          )}

        </div>

        <div style={{marginTop:'10px'}}>
          {dishes.map((dish, index) => (
            <div key={index} style={{display:'flex',marginRight:'10px',marginLeft:'10px',marginBottom: '15px',border: '0px solid #ccc',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  padding: '10px', borderRadius: '8px',gap:'8px' }}>
              <img src={dish.image} alt={dish.dishName || dish.name} style={{ width: '100px',height:'100px', borderRadius: '8px' }} />
              <div>
              <h2 style={{fontSize:'16px',fontWeight:'bold',}}>{dish.dishName || dish.name}</h2>
              <p style={{color:'#C01D2E'}}><strong></strong> ${dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
