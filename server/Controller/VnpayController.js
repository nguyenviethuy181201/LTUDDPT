import asyncHandler from 'express-async-handler';
import * as config from "../config/vnpay.js";
import moment from 'moment';
import qs from 'qs';
import CryptoJS from 'crypto-js';
import User from '../Models/UserModels.js';

const registerMember = asyncHandler(async(req, res) => {
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    
    
    let secretKey = config.default.vnp_HashSecret;
    let vnpUrl = config.default.vnp_Url;
    let returnUrl = config.default.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    
    
    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = config.default.vnp_TmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = req.body.info;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    
    vnp_Params = sortObject(vnp_Params);

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = CryptoJS.HmacSHA512(signData, secretKey);
    let hmacHex = hmac.toString(CryptoJS.enc.Hex);
    vnp_Params['vnp_SecureHash'] = hmacHex;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });
    
    
    res.send(vnpUrl);
    

});

const returnWebsite = asyncHandler(async(req,res ) => {
    let vnp_Params = req.query;
    let statusGD = vnp_Params['vnp_ResponseCode'];
    
    let filmCode_user_resPackage = vnp_Params['vnp_OrderInfo'];
    let [filmCode, userId, resPackage] = filmCode_user_resPackage.split("_")
    let date = moment(vnp_Params['vnp_PayDate'], 'YYYYMMDDHHmmss');
    
    if(statusGD == "00"){
      const user = await User.findById(userId);
      if(user){
        user.isMember = true;
        user.registerDate = date.toDate();
        user.registerPackage = resPackage;
        await user.save();
      }
      res.redirect(`http://localhost:3000/watch/${filmCode}`)
    } else {
      res.redirect(`http://localhost:3000/movie/${filmCode}`)
    }
});



const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (let key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  };

  export {registerMember, returnWebsite};
