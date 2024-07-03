const music = new Audio('asset/musics/1.mp3')

const songs = [
    {
        id : '1',
        songname: `Bất vấn biệt ly <br>
        <div class="subtilte">Chỉ Tiêm Tiếu</div>`,
        poster: "./asset/img/1.jpg"
    },
    // all Object type
    {
        id : '2',
        songname: `Là anh <br>
        <div class="subtilte">Mộng Nhiên</div>`,
        poster: "./asset/img/2.jpg"
    },
    {
        id : '3',
        songname: `Lệ Lưu ly <br>
        <div class="subtilte">VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7</div>`,
        poster: "./asset/img/3.jpg"
    },
    {
        id : '4',
        songname: `Sự thật sau một lời hứa <Br>
        <div class="subtilte">Chi Dân</div>`,
        poster: "./asset/img/4.jpg"
    },
    {
        id : '5',
        songname: `Thanh trư <br>
        <div class="subtilte">Vương Hân Thần & Tô Tinh Tiệp</div>`,
        poster: "./asset/img/5.jpg"
    },
    {
        id : '6',
        songname: `Baby  <br>
        <div class="subtilte">Justin Bieber</div>`,
        poster: "./asset/img/6.jpg"
    },
    {
        id : '7',
        songname: `Blank Space <br>
        <div class="subtilte">Taylor Swift</div>`,
        poster: "./asset/img/7.png"
    },
    {
        id : '8',
        songname: `Faded <br>
        <div class="subtilte">Alan Walker</div>`,
        poster: "./asset/img/8.jpg"
    },
    {
        id : '9',
        songname: `Havana <br>
        <div class="subtilte">Shawn Mendes & Camila Cabello</div>`,
        poster: "./asset/img/9.png"
    },
    {
        id : '10',
        songname: `There's nothing holding me back<br>
        <div class="subtilte">Shawn Mendes</div>`,
        poster: "./asset/img/10.jpg"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((Element, i) => {
    Element.getElementsByTagName('img')[0].src = songs[i].poster;
    Element.getElementsByTagName('h5')[0].innerHTML = songs[i].songname;
})


document.addEventListener('DOMContentLoaded', () => {
    let masterPlay = document.getElementById('masterPlay');
    let wave = document.getElementsByClassName('wave')[0];

    masterPlay.addEventListener('click',()=> {
    if(music.paused || music.currentTime <= 0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else{
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) =>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
        })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) =>{
        element.style.background = "rgb(105, 105, 170, 0)"
        })
}

document.addEventListener('DOMContentLoaded', () => {

    let index = 0;
    let poster_master_play = document.getElementById('poster_master_play');
    let title = document.getElementById('title');
    let wave = document.getElementsByClassName('wave')[0];

    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) =>{
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `./asset/musics/${index}.mp3`;
        poster_master_play.src = `./asset/img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songname} = ele;
            title.innerHTML = songname;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () =>{
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
            wave.classList.add('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index=1}`].style.background = "rgb(105, 105, 170, .1)"
       })
    })
});


document.addEventListener('DOMContentLoaded', () => {
    let currentStart = document.getElementById('currentStart');
    let currentEnd = document.getElementById('currentEnd');
    let seek = document.getElementById('seek');
    let bar2 = document.getElementById('bar2');
    let dot = document.getElementsByClassName('dot')[0];

    music.addEventListener('timeupdate', () => {
        let music_curr = music.currentTime;
        let music_dur = music.duration;

        let min = Math.floor(music_dur/60);
        let sec = Math.floor(music_dur%60);
        if(sec < 10){
            sec = `0${sec}`
        }
        currentEnd.innerText = `${min}:${sec}`;

        let min1 = Math.floor(music_curr/60);
        let sec1 = Math.floor(music_curr%60);
        if(sec1 < 10){
            sec1 = `0${sec1}`
        }
        currentStart.innerText = `${min1}:${sec1}`;

        let progressbar = parseInt((music.currentTime/music.duration)*100);
        seek.value = progressbar;
        let seekbar = seek.value;
        bar2.style.width = `${seekbar}%`
        dot.style.left = `${seekbar}%`
    })

    seek.addEventListener('change' ,() =>{
        music.currentTime = seek.value*music.duration/100;
    })

    music.addEventListener('ended', () =>{
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    })
});

document.addEventListener('DOMContentLoaded', () => {
    let vol_icon = document.getElementById('vol_icon');
    let vol = document.getElementById('vol');
    let vol_dot = document.getElementById('vol_dot');
    let vol_bar = document.getElementsByClassName('vol_bar')[0];
    // let vol = document.getElementsByClassName('vol');

    vol.addEventListener('change', () =>{
        if (vol.value == 0){
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.add('bi-volume-mute-fill');
            vol_icon.classList.remove('bi-volume-up-fill');
        }
        if (vol.value > 0){
            vol_icon.classList.add('bi-volume-down-fill');
            vol_icon.classList.remove('bi-volume-mute-fill');
            vol_icon.classList.remove('bi-volume-up-fill');
        }
        if (vol.value > 50){
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.remove('bi-volume-mute-fill');
            vol_icon.classList.add('bi-volume-up-fill');
        }

        let vol_a = vol.value;
        vol_bar.style.width = `${vol_a}%`;
        vol_dot.style.left = `${vol_a}%`;
        music.volume = vol_a/100;
    })
});

document.addEventListener('DOMContentLoaded', () => {
    let back = document.getElementById('back');
    let next = document.getElementById('next');
    let index = 0;

    back.addEventListener('click', () =>{
        index -=1;
        if(index < 1){
            index = Array.from(document.getElementsByClassName('songItem')).length;
        }
        music.src = `./asset/musics/${index}.mp3`;
        poster_master_play.src = `./asset/img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songname} = ele;
            title.innerHTML = songname;
        })
        makeAllPlays();

        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');

        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    })

    next.addEventListener('click', () =>{
        index -=0;
        index +=1;
        if(index > Array.from(document.getElementsByClassName('songItem')).length){
            index = 1;
        }
        music.src = `./asset/musics/${index}.mp3`;
        poster_master_play.src = `./asset/img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songname} = ele;
            title.innerHTML = songname;
        })
        makeAllPlays();

        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');

        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    })
});