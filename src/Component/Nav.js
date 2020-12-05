import { Component } from 'react';

class Nav extends Component
{
  shouldComponentUpdate(newProps,newState){
    console.log('--->Nav render shouldComponent update '
    ,newProps.data
    ,this.props.data
    );
    if(this.props.data === newProps.data){
      //이전 값과 새로 바뀐 값이 다르면 false
      return false;
    }
    //다르면 true
    return true;
  }

  render(){
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while(i < data.length ){
    //lists.push(<li><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
    lists.push(
      <li key={data[i].id}>
        <a href={"/content/"+data[i].id}
        data-id={data[i].id}
          onClick={function(id, e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
            }.bind(this , data[i].id)}>
          {data[i].title}</a>
      </li>);
    i = i+1;
    }
    return(
      <nav>
      <ul>
          {lists}
      </ul>
      </nav>
    );
  }
}

//다른곳에서 불러와 사용할수있게 
export default Nav;