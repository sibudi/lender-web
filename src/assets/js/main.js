


/**
* 数据
*/

var dataUtil = (function () {
    return {
        //姓名验证
        isName: function (text) { return /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/i.test(text); },
        //数字验证
        isNumber: function (text) { return /^[1-9][0-9]*$/i.test(text); },
        //图形验证码格式
        isImgNumber: function (text) { return /^[a-zA-Z0-9_-]{4}$/i.test(text); },
        //短信验证码格式
        isSmsNumber: function (text) { return /^[0-9]{6}$/i.test(text); },
        //手机验证
        isMobile: function (text) {
            text = text.split("-").join("");
            text = text.split("+").join("");
            text = text.split(" ").join("");

            if (text.substring(0, 2) == "08") {
                text = "62" + text.substr(1)
            }
            if (text.substring(0, 1) == "8") {
                text = "62" + text
            }
            if (/^[6][2][8][0-9]{8,11}$/i.test(text)) {
                return text
            } else {
                return false
            }
            // return /^[8][0-9]{8,10}$/i.test(text);
        },
        //邮箱验证
        isEmail: function (text) { return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(text); },
        //金钱格式验证
        isMoney: function (text) { return /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/i.test(text); },
        //去除空格
        removeBlank: function (v) { return v.replace(/\s/g, ""); },
        //json转string
        jsonToString: function (v) { return JSON.stringify(v) },
        //string转json
        stringToJson: function (v) { return eval('(' + v + ')'); },
        //转为日期格式
        parseDateandTime: function (v) {
            if(v){
            v = typeof v === 'string' || v instanceof String ? v.replace(' ', 'T') : v;
            v = new Date(v).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) + " " + new Date(v).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            return v;} else{
                return v;
            }
        },
        parseDate: function (v) {
            if(v){
            v = typeof v === 'string' || v instanceof String ? v.replace(' ', 'T') : v;
            v = new Date(v).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            return v;} else{
                return v;
            }
        },
        //转为金钱格式
        parseMoney: function (v) { if ("string" == typeof v) { v = Number(v) }; return v.toFixed(2) },
        //获取审核手续费
        getCommission: function (v) { v = Number("" + v); var re = (v * 0.03).toFixed(2); return Number(re) },
        //银行卡号 每四位 一个空格
        getSpaceBankCode: function (v) { return (v + "").replace(/\s/g, '').replace(/(.{4})/g, "$1 ") },
        // 周星驰  —>  **驰
        getStarName: function (v) { return v.replace(v.charAt(1), "*") },
        getStarName1: function (name) {
            var star = "", len = name.length - 1
            var last = name.slice(name.length - 1)
            for (var i = 0; i < len; i++) {
                star += "*"
            }
            return star + last
        },
        // 6228480078809886479 -> 622*************479
        getStarBankNo: function (v) { return (v + "").replace(/^(.{4}).*(.{3})$/, "$1 **** **** *$2") },
        getStarID: function (v) { return (v + "").replace(/^(.{3}).*(.{3})$/, "$1************$2") },
        getStarPhone: function (v) { return (v + "").replace(/^(.{3}).*(.{3})$/, "$1*****$2") },
        //字母随机数
        getRandom: function () { return (Math.random() / +new Date()).toString(36).replace(/\d/g, '').slice(1) },
        parseNumber: function (v) {
            // let b=parseInt(v).toString();
            // let len=b.length
            // if(len<=3){return b;}
            // let r=len%3;
            // return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");

            return parseFloat(v).toLocaleString('id-ID')
        }
    }
})();

// 浏览器判断
var browserObj = function () {
    var u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: u.indexOf('Mobile') > -1, //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信
        qq: u.indexOf("QQBrowser") > -1, //是否QQ浏览器
        mobile_qq: u.indexOf("MQQBrowser") > -1, //是否是手机QQ浏览器
        uc: u.indexOf("UCBrowser") > -1, //是否是uc浏览器
        baidu: u.indexOf("Baidu") > -1, //是否是百度浏览器
        firefox: u.indexOf("Firefox") > -1, //是否是火狐浏览器
        lieBao: u.indexOf("LieBao") > -1, //是否是猎豹浏览器
        sogou: u.indexOf("SogouMobile") > -1, //是否是搜狗手机浏览器
        HYQ: u.indexOf("HYQ") > -1

    };
};
var browser = browserObj();

//原型式继承
function inheritobject(o) {
    //声明一个过渡函数对象
    function F() {
    }
    //过渡原型对象继承父对象
    F.prototype = o;
    //返回过渡对象的一个实列，该实例的原型继承了父对象
    return new F();
}

/*
 *寄生式继承 继承原型
 * 传递参数subclass 子类
 * 传递参数superclass 父类
 * */
function inheritPrototype(subclass, superclass) {
    //复制一份父类的原型副本保存在变量中
    var p = inheritobject(superclass.prototype);
    //修正因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subclass;
    //设置子类原型
    subclass.prototype = p;
}

var Alert = function (data) {
    //没有数据则返回
    if (!data) {
        return;
    }
    //设置内容
    this.content = data.content;
    //创建提示框面板
    this.panel = document.createElement('div');
    this.panelControl = document.createElement('div');
    //创建提示内容组件
    this.contentNode = document.createElement('p');
    //创建确定按钮组件
    this.confirmBtn = document.createElement('span');
    //创建关闭按钮组件
    this.closeBtn = document.createElement('b');
    //为提示框面板添加类
    this.panel.className = 'alert';
    this.panelControl.className = 'alertControl';
    //为关闭按钮添加类
    this.closeBtn.className = 'a-close';
    //为确定按钮添加类
    this.confirmBtn.className = 'a-confirm';
    //为确定按钮添加文案
    this.confirmBtn.innerHTML = data.confirm || 'Konfirmasikan';   //确认按钮
    //为提示内容添加文案
    this.contentNode.innerHTML = this.content;
    //点击确认按钮执行方法，如果data中有success方法则为success方法，否则为空函数
    this.success = data.success || function () { };
    //点击关闭按钮执行方法
    this.fail = data.fail || function () { };
}
//提示框原型方法
Alert.prototype = {
    //创建方法
    init: function () {
        //生成提示框
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.panelControl);
        this.panel.appendChild(this.closeBtn);
        this.panelControl.appendChild(this.confirmBtn);
        //插入页面中
        document.body.appendChild(this.panel);
        //绑定事件
        this.bindEvent();
        //显示提示框
        this.show();
    },
    bindEvent: function () {
        var me = this;
        //关闭按钮点击事件
        this.closeBtn.onclick = function () {
            //执行关闭取消方法
            me.fail();
            //隐藏弹层
            me.hide();
        }
        //确定按钮事件
        this.confirmBtn.onclick = function () {
            //执行关闭方法
            me.success();
            //隐藏弹层
            me.hide();
        }
    },
    //隐藏弹层方法
    hide: function () {
        this.panel.style.display = 'none';
    },
    //显示弹层方法
    show: function () {
        this.panel.style.display = 'block';
    }
}
/*扩展其他类型弹层*/
//右侧提示框
var RightAlert = function (data) {
    //继承基本提示框构造函数
    Alert.call(this, data);
    //为确认按钮添加right类设置位置居右
    this.confirmBtn.className = this.confirmBtn.className + 'right';
}
//继承基本提示框方法
RightAlert.prototype = new Alert();

//标题提示框
var TitleAlert = function (data) {
    //继承基本提示框构造函数
    Alert.call(this, data);
    //设置标题内容
    this.title = data.title;
    //创建标题组件
    this.titleNode = document.createElement('h3');
    //标题组件中写入标题内容
    this.titleNode.innerHTML = this.title;
}
//继承基本提示框方法
TitleAlert.prototype = new Alert();
//对基本提示框创建 方法扩展
TitleAlert.prototype.init = function () {
    //插入标题
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    //继承基本提示框init方法
    Alert.prototype.init.call(this);
}

//带有取消按钮的弹出框
var CancelAlert = function (data) {
    TitleAlert.call(this, data);
    //取消按钮文案
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span');
    this.cancelBtn.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || 'Batalkan'; //取消
}
CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function () {
    TitleAlert.prototype.init.call(this);
    this.panelControl.appendChild(this.cancelBtn);
}
CancelAlert.prototype.bindEvent = function () {
    var me = this;
    TitleAlert.prototype.bindEvent.call(me);
    this.cancelBtn.onclick = function () {
        me.fail();
        me.hide();
    }
}
// new Alert ({
//     title : '提示标题',
//     content : '别问我为什么没有样式，我只精通js',
//     success : function(){
//         console.log('ok');
//     },
//     fail : function(){
//         console.log('cancel');
//     }    
// }).init(); 
// new CancelAlert({
//     title : '提示标题',
//     content : '别问我为什么没有样式，我只精通js',
//     success : function(){
//         console.log('ok');
//     },
//     fail : function(){
//         console.log('cancel');
//     }
// }).init();  

export default {
    dataUtil,
    browser,
    CancelAlert,
    Alert
}