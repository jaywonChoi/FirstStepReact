import { Component } from 'react';

//subject 태그로 만들어서 재사용할수있게
//{this.props.value}을 이용해 재사용가능
class Subject extends Component
{
  render() {
    return (
      <header>
            <h1><a href='/' onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}>{this.props.title}</a></h1>
            {this.props.sub}
      </header>
    );
  }
}
//end

export default Subject;