import  app  from 'firebase/app'
import firestore from 'firebase/firestore'

const config = {
apiKey: "AIzaSyAbgsCdEUHq9jj5VAsP8o-Jxgk7CIM_70g",
authDomain: "zereo-34f23.firebaseapp.com",
databaseURL: "https://zereo-34f23.firebaseio.com",
projectId: "zereo-34f23",
storageBucket: "zereo-34f23.appspot.com",
messagingSenderId: "263369375140",
appId: "1:263369375140:web:df47c2d2abb4cbba505531"
};

class Firebase {
  constructor(props) {
    app.initializeApp(config)
    this.db = app.firestore()
  }

  addSpend = (date,totalSpend)=>{
    return this.db.collection('Spend').add({
      date: date,
      totalSpend: totalSpend
    })
  }

  updateSpendToday = (totalSpend,id)=>{
    return this.db.collection('Spend').doc(id).update({
      totalSpend: totalSpend
    })
  }

      
      addSalary = (salary)=>{
    return this.db.collection('Salary').add({
      salary: salary
    })
  }

  getSalary = ()=>{
    return this.db.collection('Salary').doc('PvMdJhGtHTsi6rFyRO9G').get()
  }
  updateSalary = (salary)=>{
    return this.db.collection('Salary').doc('PvMdJhGtHTsi6rFyRO9G').update({
      salary: salary
    })
  }

  getHistory = ()=>{
    return this.db.collection('Spend').get()
  }

  getSpend = (id)=>{
    return this.db.collection('Spend').doc(id).get()
  }
}

export default Firebase