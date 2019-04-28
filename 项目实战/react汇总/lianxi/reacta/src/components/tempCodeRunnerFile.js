

let isT = true
let  transcation = (component)=>{
    component.state = component.peddingState
    component.render()
    isT = false
}
class A {
    constructor(){
        this.state  = {number:0}
        this.peddingState = {...this.state}
    }
    setState(obj){
        if(isT){
            this.peddingState = {...this.state,...obj}
        }else{
            this.peddingState = {...this.state,...obj}
            transcation(this)
        }

    }
    update(){
        setTimeout(() => {
            // console.log('number',this.state.number)
            this.setState({number:this.state.number+1})
            this.setState({number:this.state.number+3})
            this.setState({number:this.state.number+2})
        }, 0);

        transcation(this)
    }
    render(){
        // console.log(this.state.number)
    }
}

let a = new A()
a.update()