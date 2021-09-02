Vue.component('Timer', {
  template: '<div class="timer"><span class="count">{{timeRemain}}</span><br><span v-if="endtime">отсчет завершен {{endtime}}</span></div>',
  props: {
  	countdown: {
    type: String,
    default: '00.000'
    }
  },
  data() {
  	return {
    	endtime: '',
      timeRemain: '',
      updateInterval: 1000,
      timer: false
    }
  },
  mounted () {
  	this.timeRemain = this.formatTimerString(+this.countdown)
  	let ms = this.timeRemain * 1000
    this.timer = setInterval(() => {
      if (ms <= 0 ) {
      	this.stopTimer()        
      } else {
      	ms = ms - this.updateInterval <= 0? 0 : ms - this.updateInterval
      	this.timeRemain = this.formatTimerString(ms / 1000)
      }
    }, this.updateInterval)
  },
  methods : {
  	getTime (date) {
      let hours = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()
      let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()
    	return `${hours}:${minutes}`
    },
    stopTimer () {
    	clearInterval(this.timer)
      this.endtime = this.getTime(new Date())
    },
    formatTimerString(number) {
    	let seconds = number.toFixed(3)
    	let timerString = seconds < 10? `0${seconds}` : seconds
      return timerString
    }
  }
});

new Vue({
  el: "#app",
  data () {
    return {
      timers: [],
      time: ''
    }    
  },
  methods: {
  	startNewTimer() {
    let newTime
    if ((+this.time) == false || +this.time >= 100 || +this.time < 0){
        alert("ошибка - допускаются только числа больше 0 и меньше 100")
      return
    }
    	newTime = (+this.time).toFixed(3).toString()
      newTime = newTime < 10? '0' + newTime : newTime
      this.timers.push({
      	id : this.timers.length,
        countdown: newTime
      })
    }
  }
})