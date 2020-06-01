import  app  from 'firebase/app'
import firestore from 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCA13XvNtae0WCo8WQhZsFaeBi1woFWqVE",
  authDomain: "i-test-24f78.firebaseapp.com",
  databaseURL: "https://i-test-24f78.firebaseio.com",
  projectId: "i-test-24f78",
  storageBucket: "i-test-24f78.appspot.com",
  messagingSenderId: "460700484724",
  appId: "1:460700484724:web:d618c0db78d70c3439fd21"
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

  updateSpendToday = (date,totalSpend,id)=>{
    return this.db.collection('Spend').add({
      date: date,
      totalSpend: [...totalSpend,{date: date,totalSpend: totalSpend}]

      
    })
  }

      
      addSalary = (salary)=>{
    return this.db.collection('Salary').add({
      salary: salary
    })
  }

  getSalary = ()=>{
    return this.db.collection('Salary').doc('7Zbi3nMTKFXw5HJzdmBS').get()
  }
  updateSalary = (salary)=>{
    return this.db.collection('Salary').doc('7Zbi3nMTKFXw5HJzdmBS').update({
      salary: salary
    })
  }

  getHistory = ()=>{
    return this.db.collection('Spend').get()
  }
}

export default Firebase