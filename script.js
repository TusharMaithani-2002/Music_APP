console.log("creating a music app");
const play = document.getElementById("play");
const music = document.querySelector("#audio");
const img = document.getElementById("image");
const title = document.querySelector("#title")
const artist = document.querySelector("#artist")
const next = document.querySelector("#forward")
const prev = document.querySelector("#prev")
let progress =document.getElementById('progress');
const Duration = document.getElementById("duration")
let current_time = document.getElementById("current-time")
const progress_div = document.getElementById("progress-div")
let count=0;
const songs = [
    {
    name : 'adventure',
    title: "Adventure",
    artist : "JJD"
    },
    {
    name : 'differentHeaven',
    title: "Differnt Heaven",
    artist : "Nekozilla"
    },
    {
    name : 'electronomia',
    title: "Electronomia",
    artist : "NCS"
    },
    {
    name : 'hellcat',
    title: "Hell Cat",
    artist : "Desmeon"
    },
    {
    name : 'letsgo',
    title: "Lets Go",
    artist : "Lensko"
    },
    {
    name : 'on&on',
    title: "On and On",
    artist : "Daniel Levi"
    },
    {
    name : 'skyhigh',
    title: "Sky High",
    artist : "Elektronomia"
    },
    {
    name : 'symbolism',
    title: "Symbolism",
    artist : "Electro-Light"
    },
    {
    name : 'warriyo',
    title: "Warriyo",
    artist : "Laura Brehm"
    },
    {
    name : 'wherewestarted',
    title: "Where we started",
    artist : "Lost Sky (NCS)"
    },
    {
    name : 'disfigure',
    title: "Disfigure Blanc",
    artist : "NCS"
    }
]

// displaying song for the first time
title.innerHTML = songs[0].title;
artist.textContent = songs[0].artist;

let isPlaying=false;

function pauseMusic() {
    music.pause();
    isPlaying=false;
    img.classList.remove("anime");
    play.classList.replace("fa-pause","fa-play")
}

function playMusic() {
    music.play();
    isPlaying=true;
    img.classList.add("anime");
    play.classList.replace("fa-play","fa-pause");
}

play.addEventListener('click',()=>{
    // loadSong(songs[count]);
    isPlaying ? pauseMusic() : playMusic();
});

// changing music data

const loadSong = (songs)=>{
    
    let random = Math.round(Math.random()*5)+1
    progress.style.width = `0cm`;
    title.innerHTML = songs.title;
    artist.textContent = songs.artist;
    music.src= "music/" + songs.name+ ".mp3";
    img.src = "images/index"+random+".jpg" ;
    isPlaying=false;
    isPlaying ? pauseMusic() : playMusic();

}
// playing next song
function nextSong(){
    loadSong(songs[(++count)%songs.length]);
}
next.addEventListener("click",()=>{
    console.log("next");
    nextSong();
    // isPlaying ? pauseMusic() : playMusic();
})
prev.addEventListener("click",()=>{
    console.log("prev");
    if(count==0) count = songs.length;
    loadSong(songs[--count]);
})

// progress work

music.addEventListener('timeupdate',(e)=>{
  const {currentTime,duration} = e.target;
  let progress_time = Math.floor((currentTime/duration)*100);
//   console.log(progress_time);
//   console.log(currentTime);
  progress.style.width = `${progress_time}%`;

  // music duration update
  if((currentTime %60 )< 10){
  current_time.innerHTML = Math.floor(currentTime) ? (Math.floor(currentTime/60)+":0"+Math.floor(currentTime%60)):"0:00";
  }
 else current_time.innerHTML = currentTime? (Math.floor(currentTime/60)+":"+Math.floor(currentTime%60)):"0:00";
  Duration.innerHTML = duration ?( Math.floor(duration/60)+":"+Math.floor(duration%60)):"0:00";

  // this also works but we can do it with event listner
//   if(currentTime >= duration) {
//       loadSong(songs[(++count)%songs.length])
//   }
})

// progress on click functionality
progress_div.addEventListener("click",(e)=>{

   // const duration = music.duration
  // is same by destructuring
   const {duration} = music;
   let moveprogress = (e.offsetX/e.target.clientWidth);
   music.currentTime = parseInt(moveprogress*duration);
//    console.log(moveprogress);
})
// calling next song
music.addEventListener("ended",nextSong);
