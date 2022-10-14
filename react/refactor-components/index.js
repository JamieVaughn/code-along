const comp0 = document.getElementById('comp0')
const comp1 = document.getElementById('comp1')
const comp2 = document.getElementById('comp2')
const comp3 = document.getElementById('comp3')
const comp4 = document.getElementById('comp4')

const avatar = <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="128" height="128">
  <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
    <rect width="36" height="36" rx="72" fill="white"></rect>
  </mask>
  <g mask="url(#mask__beam)">
    <rect width="36" height="36" fill="#edb92e"></rect>
    <rect x="0" y="0" width="36" height="36" transform="translate(1 7) rotate(63 18 18) scale(1)" fill="#ce1836" rx="36"></rect>
    <g transform="translate(-7 3.5) rotate(3 18 18)">
      <path d="M13,19 a1,0.75 0 0,0 10,0" fill="white"></path>
      <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="white"></rect>
      <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="white"></rect>
    </g>
  </g>
</svg>

class Comp0 extends React.Component {
  // React components are simple functions that take in props and state, and render HTML
  render() {
		return (
			<div className="centered">{/* React components must have a single root node/element */}
				<h1>A Simple React Component Example</h1>
				<div className="form-group"> {/* `class` is reserved in JS, so className must be used */}
					{avatar} { /* Notice no quotes ("") for the src expression */ }
				</div>
				<div className="form-group">
					<label htmlFor="simpleInput">Simple Label: </label> 
          {/* `for` is reserved in JS, so htmlFor must be used */}
					<input type="text" className="form-control" id="simpleInput" />
				</div>
				<div className="form-group" style={{fontSize: '2rem'}}>
          {/* style attribute requires double curly braces because the css is passed as an object & css rules must follow camelCase */}
					<button type="button" className="btn" disabled={true}>Submit</button> 
          {/* Some form attributes use an expression to set true or false: they include disabled, required, checked and readOnly */}
				</div>
				<p className="help-block" dangerouslySetInnerHTML={{__html: 'I\'m some <span class="text-danger">dangerous</span> helper text.'}} />
        {/* This inserts raw HTML and is also a self-closing tag */}
			</div>
		);
	}
}

class Comp1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }
  
    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }  
  
    render() {
      return (
        <div>
          Seconds: {this.state.seconds}
        </div>
      );
    }
  }

  const Comp2 = () => {
    const [search, setSearch] = React.useState('')
    const handleChange = e => setSearch(e.target.value)
    const handleSubmit = e => console.log(`You searched for ${search}`)
    return (
      <label className="search">
        <input placeholder="Search" value={search} onChange={handleChange} />
        <button>
          <img 
            src="https://unicons.iconscout.com/release/v0.0.4/svg/search.svg" 
            style={{height: "16px", width: 'auto'}}
            onSubmit={handleSubmit}
          />
        </button> 
      </label>
    )
  };

  const Comp3 = props => {
    let spinner =
      props.type === "circle" ? (
        <div>
          <svg width="50px" height="50px" viewBox="0 0 50 50">
            <circle
              fill="none"
              stroke="dodgerblue"
              strokeWidth="4"
              strokeDasharray="45,40"
              cx="25"
              cy="25"
              r="15"
            />
            <animateTransform
              attributeName="transform"
              dur="0.5s"
              type="rotate"
              from="0 0 0 "
              to="360 0 0"
              repeatCount="indefinite"
            />
          </svg>
        </div>
      ) : (
        <div className="bouncing-bar">
          <svg width="60px" height="13px" viewBox="0 0 50 10">
            <line
              x1="5"
              y1="5"
              x2="25"
              y2="5"
              stroke="crimson"
              strokeWidth="10px"
              strokeLinecap="round"
              strokeDasharray="50,7.5"
            />
            <animateTransform
              attributeName="transform"
              type="translateX(0)"
              values="-5;30;-5"
              dur="1s"
              repeatCount="indefinite"
            />
          </svg>
        </div>
      );
    return spinner;
  };

class Comp4 extends React.Component{
  constructor(props) {
    super(props);
    this.state = { clicks : 0};
  }

  handleClick  = function () {
    // console.log(this)
    this.setState(clicks => ({clicks: this.state.clicks + (this.props.factor * 1)}))
  }.bind(this) // try logging w & w/o binding

  render() {
    return (
      <button 
      className='btn'
      onClick={this.handleClick}>
        {this.state.clicks}
      </button>
    )
  }
}

ReactDOM.render(<Comp0 />, comp0)
ReactDOM.render(<Comp1 />, comp1)
ReactDOM.render(<Comp2 />, comp2)
ReactDOM.render(<Comp3 type="circle" />, comp3)
ReactDOM.render(<Comp4 factor={1} />, comp4)
