import React, { useState } from "react";
import ReactDOM from "react-dom";
import { format } from "util";

	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
            {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


const CardList = (props) => (
    <div>
        {props.profiles.map(profile=><Card key={profile.id} {...profile} />)}
    </div>   
)


class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        )
    }
}

class Form extends React.Component {
    // userNameInput = React.createRef()
    state = {
        userName: ''
    }
    handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log('evt', this.userNameInput.current.value);
        let testProfiles= ["https://api.github.com/users/LuciOroles", "https://api.github.com/users/gaearon"]
        let gitHubUsers= "https://api.github.com/users/"
        console.log(this.state.userName);
        let resp = await fetch(`${gitHubUsers}${this.state.userName}`);
        let data =  await resp.json();
        this.props.onSubmit(data);

        //reset user value
        this.setState({
            userName: ''
        });
        // resp.json().then(console.log);


    }
    render() {
        return (
            <form  action="" onSubmit={this.handleSubmit}>
                <input  type="text" 
                placeholder="GitHub userName"
                value= {this.state.userName}
                onChange={event=> this.setState({userName: event.target.value})}
                required
                />
                <button>Add card</button>
            </form>
        )
    }
}

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state =  {
    //         profiles: testData
    //     }
    // }

    state= {
        profiles: []
        // testData
    }

    addNewProfile= (profileData)=>{
        this.setState(prevState=>({
            profiles: [...prevState.profiles, profileData] 
        }))
        console.log('App', profileData );
    }
 
    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
            </div>
        )
    }
}

// const App = ({title}) => (
//     <div className="header">{title}</div>
//   );


document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        <App title="The GitHub Card(s) App" />,
        document.getElementById("mount")
    );
});