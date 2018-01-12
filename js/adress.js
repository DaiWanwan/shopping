/**
 * Created by anthony on 2018/1/11.
 */
new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        currIndex:0,
        shippingMethod:1,
        delFlag:false,
        addFlag:false,
        message:'more'
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{  //实时计算
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (response) {
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                }
            });
        },
        loadMore:function () {
            if(this.limitNum==this.addressList.length){
                this.limitNum=3;
                this.message='more';
            }else {
                this.limitNum=this.addressList.length;
                this.message='less';
            }
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;

                }else {
                    address.isDefault=false;
                }
            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
        },
        delAddress:function () {
            this.addressList.splice(this.currIndex,1);//删除一个元素
            this.delFlag=false;
        },
        addConfirm:function () {
            this.addFlag=true;

        }
    }
});