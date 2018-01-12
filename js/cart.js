/**
 * Created by anthony on 2018/1/11.
 */
var vm=new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    //局部过滤器
    filters:{
        formatMoney:function (vaule) {
            return "￥"+vaule.toFixed(2);  //保留两位小数
        }
    },
    mounted:function (){
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods:{
        cartView:function () {
            var _this=this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (res) {
                _this.productList=res.data.result.list;
                // _this.totalMoney=res.data.result.totalMoney;
            });
        },
        changeMoney:function (product,way) {
            if(way>0){//加
                product.productQuantity++;
            }else {//减
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function (item) {
            if(typeof item.checked =="undefined"){
                //第一种方法使用Vue.set();
                // Vue.set(item,"checked",true);
                //第二种方法使用this.$set();
                this.$set(item,"checked",true);
            }else {
                item.checked=!item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == "undefined") {
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this = this;
            this.totalMoney=0;
            this.productList.forEach(function (item, index) {
               if(item.checked){
                   _this.totalMoney += item.productPrice*item.productQuantity;
               }
            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function () {
            //1.0版本 2.0不支持
            // this.delProduct.$delete(this.curProduct);
            //    2.0版本
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);//删除一个元素
            this.delFlag=false;
        }
    }
});

//全局过滤器 用于传递参数时  Money("type")
Vue.filter("Money",function (vaule,type) {
    return vaule.toFixed(2)+type;
});