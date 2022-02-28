import { Component } from 'react';
import axios from 'axios';
import style from './Home.module.css'
import notimage from '../../images/hero.png';
export default class Home extends Component
{
  state={
    recipes:[]
  }
  getRecipe=async()=>{
    let {data}=await axios.get('https://forkify-api.herokuapp.com/api/search?q=pizza');
    this.setState({recipes:data.recipes});
  }
  componentDidMount(){
    this.getRecipe();
  }
  render(){
    return(
      <>
      <div className='header'>
      <img className='w-100' src={notimage} alt='fff'></img>
      </div>
     <h2 className='bg-dark text-white text-center'>ان شاء الله هبقى حد مهم جدا فى الرياكت</h2>
      <div className='row'>
        {this.state.recipes.length>0?this.state.recipes.map((recipe,index)=>
          <div key={index} className='col-md-4 my-3'>
            <img className={`${style.imgh} w-100`} src={recipe.image_url}></img>
            <h5>{recipe.title}</h5>
          </div>
        ):<h3>loading ........</h3>}
      </div>
     </>
     )
  }
}