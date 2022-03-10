let audioElement = new Audio('trss.mp3');
let songindex = 0;
let mastersongname = document.getElementById('mastersongname');
let masterplay = document.getElementById('masterplay');
let mypgbar = document.getElementById('mypgbar');
let gif = document.getElementById('gif');
let si = document.getElementsByClassName('si');

let songs = 
[
    {songname: "The Real Slim shady, Marshal Mathers LP1", filepath:"trss.mp3", coverpath:"mmlp1.webp"},
    {songname: "Lose Yourself, 8 Mile", filepath:"ly.mp3", coverpath:"8m.jpg"},
    {songname: "Without Me, The Eminem Show", filepath:"wm.mp3", coverpath:"es.jpg"},
    {songname: "Not Afraid, Recovery", filepath:"na.mp3", coverpath:"mmlp1.webp"},
    {songname: "Godzilla, Music To Be Murdered By", filepath:"gz.mp3", coverpath:"mtbmba.png"},
    {songname: "Alfred's Theme, Music To Be Murdered By Side B", filepath:"at.mp3", coverpath:"mtbmbbjpg"}
]

// audioElement.play();
masterplay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        // gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>
{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    mypgbar.value = progress;
});

mypgbar.addEventListener('change', ()=>
{
    audioElement.currentTime = (mypgbar.value * audioElement.duration)/100;
})

const makeallplays = ()=>
{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((Element)=> {
        Element.classList.add('fa-circle-play');
        Element.classList.remove('fa-circle-pause');
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((Element)=> 
{
    Element.addEventListener('click',(e)=>
    {
        makeallplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songname; 
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.add('fa-pause');
        masterplay.classList.remove('fa-play');
        gif.style.opacity = 1;
    })
});

document.getElementById('next').addEventListener('click',()=>
{
    if(songindex>=5){songindex = 0;}
    else{ songindex += 1;}
    audioElement.src = `${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.add('fa-pause');
    masterplay.classList.remove('fa-play');
    gif.style.opacity = 1;
});

document.getElementById('prev').addEventListener('click',()=>
{
    if(songindex<=0){songindex = 0;}
    else{ songindex -= 1;}
    audioElement.src = `${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.add('fa-pause');
    masterplay.classList.remove('fa-play');
    gif.style.opacity = 1;
});