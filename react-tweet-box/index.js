const node = document.getElementById('root')


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            photo: false,
            show: false,
            dataURI: ''
        }
        this.photoRef = React.createRef()
    }
    showModal = () => {
        this.setState(prev => ({show: !prev.show}))
    }
    togglePhoto = () => {
        this.setState(prev => ({photo: !prev.photo}))
        // Get a reference to the input file element
        this.photoRef.current.click()
    }
    handleUpload = (e) => {
        let file =  e.target.files[0]
        console.log('file', file)
        let reader = new FileReader()
        reader.onloadend = (e) => {
            console.log('onloadend', e.target.result)
            this.setState({dataURI: e.target.result})
        }
        reader.onerror =(e) => {
            console.log('photo didnt upload')
        }
        reader.readAsDataURL(file)
    }
    handleChange = (e) => {
        this.setState({text: e.target.innerText})
    }
    getRemainingChars = () => {
        let chars = 140 - this.state.text.length
        if(this.state.photo) chars -= 24
        return chars
    }
    tweetMsg = () => {
        window.open('https://twitter.com/intent/tweet?text='+this.state.text, '_blank')
    }
    render(){
        return (
            <>
                <button onClick={this.showModal}>Compose Tweet</button>
                {this.state.show ?
                <div className="card bg-light">
                    <div className="card-body text-right">
                        <h1 onMouseOver={() => console.log(this.state)}>Tweet Something!</h1>

                        <div 
                        className="form-control text-left" 
                        style={ {height: 'auto'} }
                        onInput={this.handleChange}
                        contentEditable='true'></div>
                        <img src={this.state.dataURI} />

                        <span className={this.getRemainingChars() <= 0 ? 'text-danger' : ''}>
                            {this.getRemainingChars() <= 0 ? 'Too Long! ' : ''}{this.getRemainingChars()}
                        </span>
                        <button 
                        className='btn btn-primary' 
                        disabled={this.getRemainingChars() <= 0}
                        onClick={this.tweetMsg}>Tweet</button>

                        <button 
                        className='btn btn-secondary' 
                        onClick={this.togglePhoto}>
                            { this.state.photo ? 'Photo Uploaded' : 'Add Photo'}
                        </button>
                        <input
                        type='file'
                        style={{display: 'none'}} 
                        ref={this.photoRef}
                        onChange={(event) => this.handleUpload(event)}/>
                    </div>
                </div> : ''}
            </>
        )
    }
}

ReactDOM.render(<App/>, node)