let myName = 'Jamie'
let aSection = <section id='blog'>Blog</section>
let mySections = [<section id='home'>Section 1</section>, <section id='blog'>Section 2</section>, <section id='contact'>Section Contact {myName}</section>]


function App () {
  return (
    <div className='wrapper'>
      <Header />
      <Article />
      <Aside css='sidebar' type='bar' flag={true} mysection={<span>inline JSX</span>}/> 
      <Aside css='sidenav' type='nav' flag={false} mysection={aSection} />
      {/* <Sidenav />
      <Sidebar /> */}
      <Footer />
    </div>
  )
}


function Header () {
  const handleClick = (event) => {
    console.log(event.nativeEvent)
  }
  return (
    <header>
      <h1 onClick={handleClick}>Responsive Grid Layout</h1>
      <nav>
        <a href='#home'>Home</a>
        <a href='#blog'>Blog</a>
        <a href='#Contact'>Contact</a>
      </nav>
    </header>
  )
}

function Article () {
  return (
    <article className='content'>
      <section id='home'>
        <Dice d={6}/>
      </section>
      {aSection}
      <section id='contact'>Contact {myName}</section>

      {/* {mySections.map((item, index) => <div key={index}>{item}</div>)} */}
    </article>
  )
}

function Aside ({css, type, flag, mysection}) {
  const [name, setName] = React.useState('Jamie')

  if(flag) {
    return <div>it's true</div>
  } else {
    return (
      <aside className={`${css}`}>
        ({name}) Side {type}
        {mysection}
      </aside>
    )
  }
  
}



// function Sidenav () {
//   return (
//     <aside className='sidenav'>Side Nav</aside>
//   )
// }

// function Sidebar () {
//   return (
//     <aside className='sidebar'>Side bar</aside>
//   )
// }

function Footer () {
  return (
    <footer className='footer'>My Footer</footer>
  )
}
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('example'));
// }

// setInterval(tick, 1000);

function Dice (props) {
  const [roll, setRoll] = React.useState(0)
  const [rotate, setRotate] = React.useState(false)

  const randomNumber = () => {
    setRotate(true)
    setRoll(Math.ceil(Math.random() * props.d))
  }

  return (
    <div>
      <span className={`dice d${roll} ${rotate && 'roll'}`}
            onAnimationEnd={() => setRotate(false)}
      ></span>
      <br />
      <output>{roll}</output>
      <br/>
      <button onClick={randomNumber}>Roll the Dice!</button>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
