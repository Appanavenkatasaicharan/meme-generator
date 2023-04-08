import { useState ,useEffect} from 'react';
import data from '../memesData';

export default function Meme(){


    // States of our meme component and meme data.    
    const [meme,setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : ""
    })

    const [allRandomMemes,setAllRandomMemes] = useState([]);

     // Effect to handle the api call

    useEffect(
        () => {
            fetch("https://api.imgflip.com/get_memes")
            .then( res => res.json())
            .then(data => setAllRandomMemes(data.data.memes))
        } , []
    )

    // Chooses a random url from the api data

    function getMeme(){
        const ind = Math.floor(Math.random() * 100);
        const url = allRandomMemes[ind].url;
        setMeme(
            prevMeme => ({
                ...prevMeme,
                randomImage : url
            })
        )
    }

    // Tracks the changes in the form elements

    function handleChange(event){
        const {name,value} = event.target;
        setMeme(
            (prevMeme) => ({
                ...prevMeme,
                [name] : value
            }) 
        )
    }

    return(
        <>
        <div className="form">
            <input 
                type="text" 
                className="form--input" 
                placeholder="Top text" 
                name="topText"
                value={meme.topText}
                onChange={handleChange}
            />
            <input 
                type="text" 
                className="form--input" 
                placeholder="Bottom text"
                name= "bottomText"
                value= {meme.bottomText}
                onChange={handleChange} 
            />

            <button className="form--button" onClick={getMeme} >Get a new meme image 🖼</button>
        </div>
        <div className="meme">
        <img src= {meme.randomImage}  className="meme--img" alt=" " />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
        </>
    )
}