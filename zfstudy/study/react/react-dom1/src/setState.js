
let isUpdate = true
let transcation = (com)=>{
  com.state = com.padding
  com.render()
  isUpdate = false
}

class My{
  constructor(){
    this.state = {number:1}
    this.padding = {...this.state}
  }
  setState(obj){
    if(isUpdate){
      this.padding = {...this.padding,...obj}
    }else{
      this.padding = {...this.padding,...obj}
      transcation(this)
    }
  }
  update(){
    setTimeout(() => {
      this.setState({number:this.state.number+2})
      this.setState({number:this.state.number+5})
    }, 0);
    transcation(this)
  }
  render(){
    console.log(this.state.number)
  }

}

let my = new My()
my.update()
