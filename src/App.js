import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Nav from "./Component/Nav";
import Content from "./Component/Content";
import Subject from "./Component/Subject";
import Control from "./Component/Control";
import ReadContent from "./Component/ReadContent";
import CreateContent from "./Component/CreateContent";
import UpdateContent from "./Component/UpdateContent";

//컴포넌트를 만드는 클래스 !
//컴포넌트정리에 집중
//재사용에 용이하며 정리를 해주기때문에 보기 편함
// : 조심하기
class App extends Component
{
  //초기화를 담당
  constructor(props){
    super(props);
    this.max_content_id = 3; //state 안에 넣지않은 이유는 불필요한 렌더링으로 인해
    this.state = {
      selected_content_id: 2,
      mode:'welcome',
      subject:{title:"WEB" ,sub:"world wide web!"},
      welcome:{title:'Welcome',desc:'Hello My Freind'},
      contents:[
        {id:1,title:'Html',desc:'HTML is for information'},
        {id:2,title:'CSS',desc:'CSS is for design'},
        {id:3,title:'JavaScript',desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i+1;
    }
  }
  getContent(){
    var _title,_desc,_article= null;
    if(this.state.mode === 'Welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode ==='read'){
       var _content = this.getReadContent();
      _article =<ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create' ){
      _article = <CreateContent onSubmit={function(_title,_desc){
          //add content to this.state.contents
          this.max_content_id = this.max_content_id+1;
          //원본에 변경시킨것
          // this.state.contents.push(
          //   {id:this.max.max_content_id,title:_title,desc:_desc }
          // );
          // var _content = this.state.contents.concat({
          //   //값을 가져와서 배열에 담아 던져준다
          //   id:this.max_content_id,title:_title,desc:_desc 
          // });

          //원본을 교체를 한것
         var newContents = Array.from(this.state.contents);
         newContents.push({
           id:this.max_content_id
           ,title:_title
          , desc:_desc
        });
          this.setState({
            contents:newContents
          })
          console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update' ){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id+1;
       var newContents = Array.from(this.state.contents);
       newContents.push({
         id:this.max_content_id
         ,title:_title
        , desc:_desc
      });
        this.setState({
          contents:newContents
        })
        console.log(_title,_desc);
    }.bind(this)}></UpdateContent>
    }
    return _article;
  }


  render() {
    return (
      <div className="App">
          <Subject
           title={this.state.subject.title}
           sub={this.state.subject.sub}
           onChangePage={function(){
             //원본을 교체한것
             this.setState({mode:'Welcome'});
           }.bind(this)}>
          </Subject>
          <Nav 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
             });
          }.bind(this)}
          data={this.state.contents}
          >
          </Nav>
          <Control onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                //누구를 삭제할건지
                var _content = Array.from(this.state.contents);
                var i = 0;
                while(i < this.state.contents.length){
                  if(_content[i].id === this.state.selected_content_id){
                    _content.splice(i,1); //원본을 바꿈
                    break;
                  }
                  i = i=1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_content
                });
                alert('deleted!');
              }
            }else{
              this.setState({
                mode:_mode
              });
            }
          }.bind(this)}></Control>
          {/* <Content title={_title } desc={_desc }></Content> */}
          {this.getContent()}
      </div>
    );
  }
}

export default App;
