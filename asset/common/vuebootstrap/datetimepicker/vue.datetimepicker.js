require("./vue.datetimepicker.css");
var tpl = require("./vue.datetimepicker.html");
var now = new Date();
function padd0(val){
  return val < 10 ? ("0" + val) : val;
}
Vue.component('v-datetimepicker',{
  $date : now,
  $target : null,
  $targetKey : null,
  template : tpl,
  data : function(){
    return {
      isShow : false,
      year : now.getFullYear(),
      month : now.getMonth() + 1,
      day : now.getDate(),
      hour : padd0(now.getHours()),
      minute : padd0(now.getMinutes()),
      second : padd0(now.getSeconds()),
      yearScope : [],
      data : [],
      isMonthyearShow : false,
      bottom : "auto",
      top : '100%',
      left : this.initLeft
    };
  },
  props : {
    initLeft : {
      type : String,
      default : '0px'
    },
    weekdaysName : {
      type : Array,
      default : function(){
        return ['日','一','二','三','四','五','六'];
      }
    },
    monthName : {
      type : Array,
      default : function(){
        return ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
      }
    },
    yearText :{
      type : String,
      default : '年'
    },
    position : {
      type : String,
      default : 'bottom-right'
    },
    format : {
      type : String,
      default : 'yyyy-MM-dd hh:mm:ss'
    },
    onChoose : {
      type : Function,
      default : Vue.me.noop
    }
  },
  mounted : function(){
    this.dealData();
  },
  methods : {
    focusInput : function(e){
      var el = e.srcElement;
      el.select();
    },
    setMonth : function(month){
      this.month = month;
      this.isMonthyearShow = false;
      this.dealData();
    },
    setYear : function(year){
      this.year = year;
      this.isMonthyearShow = false;
      this.dealData();
    },
    setYearScope : function(d){
      var me = this;
      var yearScope = this.yearScope;
      for(var i=0,ii=yearScope.length;i<ii;i++){
        yearScope[i].value += d;
      }
    },
    toggleMonthyear : function(){
      if(this.toggleMonthyear.$hideEventHandle){
        document.removeEventListener("click",this.toggleMonthyear.$hideEventHandle);
        this.toggleMonthyear.$hideEventHandle = null;
      }
      this.isMonthyearShow = !this.isMonthyearShow;
      var me = this;
      if(this.isMonthyearShow){
        var years = [];
        for(var i=this.year - 2;i<=this.year + 3;i++){
          years.push({value : i});
        }
        this.yearScope = years;
        setTimeout(function(){
          me.toggleMonthyear.$hideEventHandle = function(e){
            if(Vue.me.findParentByCls(e.target,"datetimepicker-monthyear")) return;
            me.isMonthyearShow = false;
            document.removeEventListener("click",me.toggleMonthyear.$hideEventHandle);
            me.toggleMonthyear.$hideEventHandle = null;
          };
          document.addEventListener("click",me.toggleMonthyear.$hideEventHandle);
        });
      }
    },
    dealYear : function(d){
      this.year += d;
      this.dealData();
    },
    dealMonth : function(d){
      if(d === 1 && this.month === 12){
        this.month = 1;
        this.year++
      }else if(d === -1 && this.month === 1){
        this.month = 12;
        this.year--;
      }else{
        this.month += d;
      }
      this.dealData();
    },
    dealData : function(){
      var date =  new Date();
      date.setFullYear(this.year);
      date.setDate(1);
      date.setMonth(this.month - 1);
      //二维数组
      var data = [];
      //第一天星期几
      var firstDay = date.getDay();
      if(firstDay === 0){
        //第一天是星期日 则上月最后7日组成一行
        date.setDate(date.getDate() - 7);
      }else{
        date.setDate(date.getDate() - firstDay);
      }
      var j=0;
      for(var i=1;i<=42;i++){
        var target = data[j];
        if(!target){
          target = data[j] = [];
        }
        if(target.length < 7){
          var value = date.getDate();
          var month = date.getMonth() + 1;
          target.push({
            value : value,
            month : month,
            selected : !!(this.$options.$date && value === this.$options.$date.getDate() && month === this.$options.$date.getMonth() + 1 
             && date.getFullYear() === this.$options.$date.getFullYear())
          });
          date.setDate(date.getDate() + 1);
        }else{
          j++;
          i--;
        }
      }
      this.data = data;
    },
    keyup : function(e,type){
      var value = this[type] + '';
      value = value.replace(/([^\d]+$)|(^[^\d]+)/g,'');
      if(!/^\d+$/.test(value)){
        this[type] = '00';
      }else{
        value = parseInt(value);
        if(value < 10){
          value = '0' + value;
        }else{
          if(type === 'hour'){
            if(value > 23){
              value = 23;
            }
          }else{
            if(value > 59){
              value = 59;
            }
          }
          this[type] = value + '';
        }
      }
    },
    chooseDay : function(day){
      if(day.month !== this.month) return;
      for(var i=0,ii;ii=this.data[i++];){
        var isBreak = false;
        for(var j=0,jj;jj=ii[j++];){
          if(jj.selected){
            jj.selected = false;
            isBreak = true;
            break;
          }
        }
        if(isBreak){
          break;
        }
      }
      day.selected = true;
      this.day = day.value;
      var date = this.$options.$date;
      if(date){
        date.setFullYear(this.year);
        date.setMonth(this.month - 1);
        date.setDate(day.value);
        date.setHours(this.hour);
        date.setMinutes(this.minute);
        date.setSeconds(this.second);
      }else{
        date = this.$options.$date = this.getDate();
      }
      var value = this.getValue();
      if(this.$options.$targetKey && this.$options.$target){
        this.$options.$target[this.$options.$targetKey] = value;
      }
      this.onChoose(value,date);
      this.isShow = false;
    },
    clear : function(){
      this.$options.$date = null;
      if(this.$options.$target && this.$options.$targetKey){
        this.$options.$target[this.$options.$targetKey] = '';
      }
      this.dealData();
      this.isShow = false;
    },
    setToday : function(){
      if(this.format.indexOf('dd') !== -1){
        var now = new Date();
        this.$options.$date = now;
        this.setValue(now);
      }
      var value = this.getValue();
      if(this.$options.$targetKey && this.$options.$target){
        this.$options.$target[this.$options.$targetKey] = value;
      }
      this.onChoose(value,now);
      this.isShow = false;
    },
    open : function(){
      var el,target,targetKey;
      var arg0 = arguments[0];
      if(arg0){
        if(arg0 instanceof HTMLElement){
          el = arg0;
          target = arguments[1];
          targetKey = arguments[2];
        }else{
          target = arg0;
          targetKey = arguments[1];
        }
      }
      this.$options.$target = target;
      this.$options.$targetKey = targetKey;
      if(this.open.$hideEventHandle){
        document.removeEventListener("click",this.open.$hideEventHandle);
        this.open.$hideEventHandle = null;
      }
      this.isShow = true;
      var me = this;
      this.$nextTick(function(){
        if(el){
          el = Vue.me.findParentByCls(el,'datetimepicker-container');
          if(!el){
            throw new Error("必须指定一个class含datetimepicker-container的父元素或本身");
            return;
          }
          var box = Vue.me.getElBox(el);
          if(me.position === 'bottom-right'){
            me.left = box.left + 'px';
            me.top = box.top + box.height + "px";
          }else if(me.position === 'bottom-left'){
            me.left = box.left + (box.width - me.$el.offsetWidth) + 'px';
            me.top = box.top + box.height + "px";
          }
        }
        setTimeout(function(){
          me.open.$hideEventHandle = function(e){
            if(Vue.me.findParentByCls(e.target,"datetimepicker")) return;
            me.isShow = false;
            document.removeEventListener("click",me.open.$hideEventHandle);
            me.open.$hideEventHandle = null;
          };
          document.addEventListener("click",me.open.$hideEventHandle);
        });
      });
    },
    setValue : function(date){
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.hour = padd0(date.getHours());
      this.minute = padd0(date.getMinutes());
      this.second = padd0(date.getSeconds());
      this.dealData();
    },
    getDate : function(){
      return new Date(this.year + "/" + this.month + "/" + this.day + " " + this.hour + ":" + 
        this.minute + ":" + this.second);
    },
    getValue : function(){
      var date = this.getDate();
      return Vue.filter('date')(date,this.format);
    }
  }
});