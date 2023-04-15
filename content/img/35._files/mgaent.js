 var gsf_conversion_tracker_state_array = []; window.dataLayer = window.dataLayer || []; function initGSFTrackerJS(){ } function gtag() { dataLayer.push(arguments); } var generateProductIds = function (items, type = 'google') { var gsf_pids = []; for (var i = 0; i < items.length; i++) { var gsf_pid = generateProductItemsId(items[i],type); if(gsf_pid){ gsf_pids.push(gsf_pid); } } return gsf_pids; }; var generateProductItemsId = function (items, type = 'google') { var bing_sku_as_product_id = '-1'; var gsf_item_pid = 'shopify_US' + '_' + items.product_id + '_' + items.variant_id; if(type == 'bing' && bing_sku_as_product_id != -1){ if (parseInt('-1') === 1) { gsf_item_pid = items.sku; } else if (parseInt('-1') === 2) { gsf_item_pid = items.variant_id; } } else { if (parseInt('0') === 1) { gsf_item_pid = items.sku; } else if (parseInt('0') === 2) { gsf_item_pid = items.variant_id; } } return gsf_item_pid; }; function gsfGenerateLineItems(gsf_line_items) { for (var i = 0; i < gsf_line_items.length; i++) { var gsf_line_item = gsf_line_items[i]; var gsf_product_data = gsf_line_item.product || false; gsf_line_item.product_id = gsf_product_data.id || ''; var gsf_variant_data = gsf_line_item.variant || false; gsf_line_item.variant_id = gsf_variant_data.id || ''; gsf_line_item.sku = gsf_variant_data.sku || ''; gsf_line_item.vendor = ''; gsf_line_item.variant_title = ''; } return gsf_line_items; } var getShopCurrency = function (items) { var gsf_shop_currency = ''; if(typeof items != 'undefined' && items.shop_currency != '') { gsf_shop_currency = items.shop_currency; } return gsf_shop_currency; }; var gsfGetShopProductData = function (items,type) { var gsf_shop_pdata = ''; var gsf_shop_pids = []; for (var i = 0; i < items.length; i++) { var gsf_item = items[i]; if(type == 'name' || type == 'title') { var gsf_shop_pdata = (type == 'title')? gsf_item.product_title : gsf_item.name; } else if(type == 'category') { var gsf_shop_pdata = gsf_item.category; } else if(type == 'variant_id') { var gsf_shop_pdata = gsf_item.variant_id || ''; } else if(type == 'id') { gsf_shop_pids.push(gsf_item.product_id); } else if(type == 'v_id') { gsf_shop_pids.push(gsf_item.variant_id); } } return (type == 'id' || type == 'v_id') ? gsf_shop_pids : gsf_shop_pdata; }; function gsf_htmlDecode(input){ var gsf_e = document.createElement('div'); gsf_e.innerHTML = input; if(typeof gsf_e.childNodes[0] != 'undefined'){ return gsf_e.childNodes[0].nodeValue; } else { return input; } } function gsfSetCookie (name, value, minutes) { var cookie = name + '=' + value + ';'; if(minutes){ var expires = new Date(new Date().getTime() + parseInt(minutes) * 1000 * 60); cookie += 'expires=' + expires.toGMTString() + ';'; } else { cookie += 'expires=0;'; } cookie += 'path=/;'; document.cookie = cookie; } function gsfGetCookie(cookie_name) { if (document.cookie.length > 0) { var cookie_start = document.cookie.indexOf(cookie_name + '='); if (cookie_start !== -1) { cookie_start = cookie_start + cookie_name.length + 1; var cookie_end = document.cookie.indexOf(';', cookie_start); if (cookie_end === -1) { cookie_end = document.cookie.length; } return unescape(document.cookie.substring(cookie_start, cookie_end)); } } return ''; } function gsfNavigationData() { var gsf_navigation_type = 'navigate'; var gsfPerfEntries = performance.getEntriesByType('navigation'); for (var gsf_nav_i=0; gsf_nav_i < gsfPerfEntries.length; gsf_nav_i++) { var gsf_p = gsfPerfEntries[gsf_nav_i]; gsf_navigation_type = gsf_p.type; } return gsf_navigation_type; } function gsfGetLineItemsData(gsf_line_items, gsf_shopify_currency) { var gsf_google_prodids = []; var gsf_bing_prodids = []; var gsf_google_p_items_data = []; var gsf_bing_p_items_data = []; var gsf_p_items_rema_data = []; for(gsf_item_i in gsf_line_items) { var gsf_line_item = gsf_line_items[gsf_item_i]; var gsf_google_p_item_id = generateProductItemsId(gsf_line_item); var gsf_bing_p_item_id = generateProductItemsId(gsf_line_item, 'bing'); var p_item_data = {id:gsf_google_p_item_id,quantity:gsf_line_item.quantity,price:gsf_line_item.price}; gsf_google_p_items_data.push(p_item_data); var bing_p_item_data = {id:gsf_bing_p_item_id,quantity:gsf_line_item.quantity,price:gsf_line_item.price}; gsf_bing_p_items_data.push(bing_p_item_data); var gsf_p_rema_data = {variant_id:gsf_line_item.variant_id,product_id:gsf_line_item.product_id,name:gsf_line_item.title,price:gsf_line_item.price,currency:gsf_shopify_currency,sku:gsf_line_item.sku,brand:gsf_line_item.vendor,variant:gsf_line_item.variant_title,category:''}; gsf_p_items_rema_data.push(gsf_p_rema_data); if(gsf_google_p_item_id) { gsf_google_prodids.push(gsf_google_p_item_id); } if(gsf_bing_p_item_id) { gsf_bing_prodids.push(gsf_bing_p_item_id); } } return { gsf_google_prodids: gsf_google_prodids, gsf_bing_prodids: gsf_bing_prodids, gsf_google_p_items_data: gsf_google_p_items_data, gsf_bing_p_items_data: gsf_bing_p_items_data, }; } function gsfGetShopifyCartData(gsf_jQuery,callbackSuccess,callbackError,callbackComplete,set_timeout = 1000) { var gsfAjaxData = { type: 'GET', url: 'https://www.lolsurprise.com/cart.js?t=' + Date.now(), dataType: 'json', async: false, success: callbackSuccess, error: callbackError, complete: callbackComplete }; if(set_timeout == 0) { gsf_jQuery.ajax(gsfAjaxData); } else { setTimeout(function () { gsf_jQuery.ajax(gsfAjaxData); }, set_timeout); } } function gsfCallInitiateCheckout(total_price,shop_currency,cart_item,num_items,gsf_checkout_token = '') { gtag('event', 'conversion', { 'send_to': 'AW-618620030/A7BuCKTnvI4YEP7I_aYC', 'value': total_price, 'currency': shop_currency, }); } function gsfConversionTrackerRecord(conversion_state) { var gsf_timestamp = Math.floor(Date.now()); var gsf_conversion_state = conversion_state + '_' + gsf_timestamp; gsf_conversion_tracker_state_array.push(gsf_conversion_state); } function gsfPrintLog(log_key = '', log_val = '') { } function gsfCallPurchaseEvent(gsf_shopify_checkout) { var gsf_line_items = gsf_shopify_checkout.line_items || gsf_shopify_checkout.lineItems || []; var gsf_is_order_data_id = gsf_shopify_checkout.id || false; var gsf_is_order_data_number = gsf_shopify_checkout.number || false; if(gsf_line_items.length > 0 && gsf_is_order_data_id && gsf_is_order_data_number){ gsf_line_items = gsfGenerateLineItems(gsf_line_items); } var gsf_shopify_total_price = gsf_shopify_checkout.total_price || gsf_shopify_checkout.totalPrice || 0; var gsf_shopify_sub_total_price = gsf_shopify_checkout.subtotal_price || gsf_shopify_checkout.subtotalPrice || 0; var gsf_shopify_order_id = gsf_shopify_checkout.order_id || gsf_shopify_checkout.id || ''; var gsf_shopify_discount = gsf_shopify_checkout.discount || gsf_shopify_checkout.discounts || ''; var gsf_shopify_currency = gsf_shopify_checkout.currency || ''; var gsf_shopify_presentment_currency = gsf_shopify_checkout.presentment_currency || false; var gsf_shopify_customer_email = gsf_shopify_checkout.email || ''; var gsf_shopify_shipping_address = gsf_shopify_checkout.shipping_address || []; var gsf_shopify_customer_country = gsf_shopify_shipping_address.country_code || ''; if (gsf_shopify_presentment_currency && gsf_shopify_presentment_currency != ''){ gsf_shopify_currency = gsf_shopify_presentment_currency; } var is_submit_subtotal = 0; var bing_is_submit_subtotal = 0; var gsf_total_price = gsf_bing_total_price = gsf_shopify_total_price; var gsf_subtotal_price = gsf_bing_subtotal_price = gsf_shopify_sub_total_price; if(is_submit_subtotal && gsf_subtotal_price){ gsf_total_price = gsf_subtotal_price; } if(bing_is_submit_subtotal && gsf_bing_subtotal_price){ gsf_bing_total_price = gsf_bing_subtotal_price; } var gsfResponseData = gsfGetLineItemsData(gsf_line_items, gsf_shopify_currency); var gsf_bing_product_items_data = gsfResponseData.gsf_bing_p_items_data || []; var gsf_bing_ecomm_prodids = gsfResponseData.gsf_bing_prodids || []; var gsf_google_product_items_data = gsfResponseData.gsf_google_p_items_data || []; var gsf_google_ecomm_prodids = gsfResponseData.gsf_google_prodids || []; var gsf_call_purchase_event = true; gtag('event', 'page_view', { 'send_to': 'AW-618620030', 'ecomm_pagetype': 'purchase' , 'ecomm_prodid': gsf_google_ecomm_prodids, 'ecomm_totalvalue' : gsf_total_price, }); gsfConversionTrackerRecord('GDRM_purchase_call'); if(gsf_call_purchase_event) { gtag('event', 'conversion', { 'send_to': 'AW-618620030/clQ5CLnBvo4YEP7I_aYC', 'value': gsf_total_price, 'currency': gsf_shopify_currency, 'transaction_id': gsf_shopify_order_id, 'discount': gsf_shopify_discount, 'items': gsf_google_product_items_data, }); gsfConversionTrackerRecord('GCT_purchase_call'); } gsfConversionTrackerRecord('purchase_event_method_end'); } var gsfLoadScript = function(url, callback) { var script = document.createElement('script'); script.type = 'text/javascript'; if (script.readyState) { script.onreadystatechange = function() { if (script.readyState == 'loaded' || script.readyState == 'complete') { script.onreadystatechange = null; callback(); } }; } else { script.onload = function() { callback(); }; } script.src = url; document.getElementsByTagName('head')[0].appendChild(script); }; var prepareAdditionalEvent = function (gsf_jQuery) { function prepareAddtoCart() { gsf_jQuery("form[action^='/cart/add']").on('submit', function (e) { if (!(e.defaultPrevented || e.isDefaultPrevented && e.isDefaultPrevented())) { triggerAddToCart(false); } }); var _generic_ajax_open = XMLHttpRequest.prototype.open; var _generic_ajax_send = XMLHttpRequest.prototype.send; XMLHttpRequest.prototype.open = function (method, url) { this._method = method; this._url = url; _generic_ajax_open.apply(this, arguments); }; XMLHttpRequest.prototype.send = function () { this.addEventListener('readystatechange', function () { if (this.readyState === XMLHttpRequest.DONE) { if (this._url.indexOf('/cart/add') !== -1 && this.status == 200) { var cart_item = JSON.parse(this.responseText); if(typeof cart_item.items != 'undefined' && cart_item.items.length > 0){ cart_item = cart_item.items[0]; } triggerAddToCart(cart_item); } if (this._url.indexOf('/apps/oneclickupsell/upsellapp_cart') !== -1) { triggerCheckout(); } } }); _generic_ajax_send.apply(this, arguments); }; var _generic_fetch_open = window.fetch; window.fetch = function() { return new Promise((resolve, reject) => { _generic_fetch_open.apply(this, arguments) .then((response) => { if(response.url.indexOf('/cart/add') > -1 && response.status == 200){ response.clone().json().then((cart_item) => { if(typeof cart_item.items != 'undefined' && cart_item.items.length > 0){ cart_item = cart_item.items[0]; } triggerAddToCart(cart_item); }).catch((err) => { console.log(err); }); } resolve(response); }).catch((error) => { console.log(error); reject(error); }); }); }; } function prepareCheckout() { gsf_jQuery(':submit', gsf_jQuery("form[action='/cart'],form[action^='/cart?']")).on('click', function (e) { if (gsf_jQuery(this).attr('name') == 'checkout') { triggerCheckout(); } }); gsf_jQuery(document).on('click', '.gsf_checkout_btn, .shopify-payment-button, .ucd-checkout-btn, .opcCheckout, .carthook_checkout, .ymp_elem_mainBtn, .js-ajax-checkout-button, .cart__checkout, .agree-checkout, .class_none_bundle, .crt-Push_Submit, .cart_button_secure, .checkout-link, .cart-recap__checkout, .w-commerce-commercecartcheckoutbutton, .cart__checkout-button, #cartModal button.checkout-btn', function(e) { var gsf_use_snippet_data = 1; if (typeof gsf_conversion_data != 'undefined' && gsf_conversion_data && gsf_conversion_data.page_type && (gsf_conversion_data.page_type == 'cart' || gsf_conversion_data.page_type == 'product') && gsf_conversion_data.data.total_price && gsf_use_snippet_data) { var gsf_shop_currency = getShopCurrency(gsf_conversion_data.data); gsfCallInitiateCheckout(gsf_conversion_data.data.total_price,gsf_shop_currency,gsf_conversion_data.data.product_data,gsf_conversion_data.data.num_items); } else { triggerCheckout(); } }); } function triggerCheckout() { var gsf_use_snippet_data = 1; if(typeof gsf_conversion_data != 'undefined' && gsf_conversion_data && gsf_conversion_data.page_type && gsf_conversion_data.page_type == 'cart' && gsf_conversion_data.data.total_price && gsf_use_snippet_data) { var gsf_shop_currency = getShopCurrency(gsf_conversion_data.data); gsfCallInitiateCheckout(gsf_conversion_data.data.total_price,gsf_shop_currency,gsf_conversion_data.data.product_data,gsf_conversion_data.data.num_items); } else { gsf_jQuery.ajax({ type: 'GET', url: 'https://www.lolsurprise.com/cart.js?t=' + Date.now(), dataType: 'json', success: function (response) { if(response && response.total_price) { var cart_total_price = (response.total_price / 100); var cart_item = (response.items); var gsf_checkout_token = (response.token); gsfCallInitiateCheckout(cart_total_price,response.currency,cart_item,response.item_count,gsf_checkout_token); } }, }); } } function triggerAddToCart(cart_item, gsf_cart_token = '') { var gsf_gtag_args = {}; if(cart_item) { gsf_gtag_args.ecomm_prodid = generateProductIds([cart_item]);gsf_gtag_args.ecomm_totalvalue = parseFloat((cart_item.price / 100).toFixed(2)); var gsf_prod_ids = gsfGetShopProductData([cart_item],'id'); var gsf_prod_name = gsfGetShopProductData([cart_item],'title'); var gsf_bing_ecomm_prodid = generateProductIds([cart_item],'bing'); var gsf_prod_v_id = cart_item.variant_id || ''; } else { if (typeof gsf_conversion_data != 'undefined' && gsf_conversion_data && typeof gsf_conversion_data.data != 'undefined' && gsf_conversion_data.data.total_price) { gsf_gtag_args.ecomm_prodid = generateProductIds(gsf_conversion_data.data.product_data); gsf_gtag_args.ecomm_totalvalue = gsf_conversion_data.data.total_price; var gsf_prod_ids = gsfGetShopProductData(gsf_conversion_data.data.product_data,'id'); var gsf_prod_name = gsfGetShopProductData(gsf_conversion_data.data.product_data,'name'); var gsf_bing_ecomm_prodid = generateProductIds(gsf_conversion_data.data.product_data,'bing'); var gsf_prod_v_id = gsfGetShopProductData(gsf_conversion_data.data.product_data,'variant_id'); } else { console.log('Conversion Tracking Snippet is Missing'); } } if(gsf_gtag_args.ecomm_totalvalue != 'undefined' && gsf_gtag_args.ecomm_totalvalue) { var gsf_shopify_currency = ''; if(typeof gsf_conversion_data != 'undefined' && gsf_conversion_data && typeof gsf_conversion_data.data != 'undefined' && gsf_conversion_data.data) { gsf_shopify_currency = getShopCurrency(gsf_conversion_data.data); } gsf_gtag_args.send_to = 'AW-618620030'; gsf_gtag_args.ecomm_pagetype = 'cart'; gtag('event', 'add_to_cart', gsf_gtag_args); var gsf_google_add_to_cart_args = { 'send_to': 'AW-618620030/vFAsCOXjvI4YEP7I_aYC', 'value': gsf_gtag_args.ecomm_totalvalue, }; if(typeof gsf_conversion_data != 'undefined' && gsf_conversion_data) { gsf_google_add_to_cart_args.currency = getShopCurrency(gsf_conversion_data.data); } gtag('event', 'conversion', gsf_google_add_to_cart_args); } } prepareAddtoCart(); prepareCheckout(); }; function gsfLoadjQuery(force_load_our_jquery = false) { if (!window.jQuery || typeof jQuery === 'undefined' || (typeof jQuery === 'function' && typeof jQuery().jquery === 'undefined') || force_load_our_jquery) { gsfLoadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () { gsf_jQuery = jQuery.noConflict(true); prepareAdditionalEvent(gsf_jQuery); gsfConversionTrackerRecord('gsf_our_jquery_load'); }); } else { prepareAdditionalEvent(jQuery); gsfConversionTrackerRecord('gsf_default_jquery_load'); } } function initGSFTracker() { var force_load_our_jquery = false; gsfLoadjQuery(force_load_our_jquery); gtag('js', new Date()); gsfConversionTrackerRecord('gtag_config_load'); gtag('config', 'AW-618620030'); var gsf_shopify_checkout = Shopify.checkout || Shopify.order || []; var gsf_line_items = gsf_shopify_checkout.line_items || gsf_shopify_checkout.lineItems || []; var is_thank_you_page = 0; var gsf_total_price = gsf_bing_total_price = 0; var gsf_subtotal_price = gsf_bing_subtotal_price = 0; var is_submit_subtotal = 0; var bing_is_submit_subtotal = 0; var gsf_call_purchase_event = true; var gsf_shopify_total_price = gsf_shopify_checkout.total_price || gsf_shopify_checkout.totalPrice || 0; var gsf_shopify_sub_total_price = gsf_shopify_checkout.subtotal_price || gsf_shopify_checkout.subtotalPrice || 0; var gsf_shopify_order_id = gsf_shopify_checkout.order_id || gsf_shopify_checkout.id || ''; var gsf_shopify_discount = gsf_shopify_checkout.discount || gsf_shopify_checkout.discounts || ''; var gsf_shopify_currency = gsf_shopify_checkout.currency || ''; var gsf_shopify_presentment_currency = gsf_shopify_checkout.presentment_currency || false; var gsf_is_order_data_id = gsf_shopify_checkout.id || false; var gsf_is_order_data_number = gsf_shopify_checkout.number || false; var gsf_shopify_customer_email = gsf_shopify_checkout.email || ''; var gsf_shopify_shipping_address = gsf_shopify_checkout.shipping_address || []; var gsf_shopify_customer_country = gsf_shopify_shipping_address.country_code || ''; if(gsf_line_items.length > 0 && gsf_is_order_data_id && gsf_is_order_data_number){ gsf_line_items = gsfGenerateLineItems(gsf_line_items); } if (gsf_shopify_total_price && gsf_line_items.length > 0) { gsfConversionTrackerRecord('thank_you_page_condition'); is_thank_you_page = 1; if (gsf_shopify_presentment_currency && gsf_shopify_presentment_currency != ''){ gsf_shopify_currency = gsf_shopify_presentment_currency; } gsf_total_price = gsf_bing_total_price = gsf_shopify_total_price; gsf_subtotal_price = gsf_bing_subtotal_price = gsf_shopify_sub_total_price; if(is_submit_subtotal && gsf_subtotal_price){ gsf_total_price = gsf_subtotal_price; } if(bing_is_submit_subtotal && gsf_bing_subtotal_price){ gsf_bing_total_price = gsf_bing_subtotal_price; } if(gsf_shopify_order_id == '' || gsf_shopify_order_id <= 0) { gsfConversionTrackerRecord('detect_shopify_order_id_blank'); } gsfConversionTrackerRecord('thank_you_page_val_' + is_thank_you_page); } if (typeof gsf_conversion_data != 'undefined' && typeof gsf_conversion_data.page_type != 'undefined' && typeof gsf_conversion_data.event != 'undefined' && gsf_conversion_data.page_type !== '' && gsf_conversion_data.event !== '' ) { var gsf_shopify_currency = getShopCurrency(gsf_conversion_data.data); var gsf_gtag_args = { send_to: 'AW-618620030', ecomm_pagetype: gsf_conversion_data.page_type }; gsf_gtag_args.ecomm_prodid = generateProductIds(gsf_conversion_data.data.product_data); gsf_gtag_args.ecomm_totalvalue = gsf_conversion_data.data.total_price; gtag('event', 'page_view', gsf_gtag_args); } if (is_thank_you_page == 1) { var product_data = []; for(gsf_item_i in gsf_line_items) { var item = gsf_line_items[gsf_item_i]; var p_data = {variant_id:item.variant_id,product_id:item.product_id,name:item.title,price:item.price,currency:gsf_shopify_currency,sku:item.sku,brand:item.vendor,variant:item.variant_title,category:''}; product_data.push(p_data); } gtag('event', 'page_view', { 'send_to': 'AW-618620030', 'ecomm_pagetype': 'purchase' , 'ecomm_prodid': generateProductIds(product_data), 'ecomm_totalvalue' : gsf_total_price, }); gsfConversionTrackerRecord('GDRM_purchase_call'); } if (is_thank_you_page == 1 && gsf_call_purchase_event) { var product_items_data = []; for(gsf_item_i in gsf_line_items) { var item = gsf_line_items[gsf_item_i]; var p_item_id = generateProductItemsId(item); var p_item_data = {id:p_item_id,quantity:item.quantity,price:item.price}; product_items_data.push(p_item_data); } gtag('event', 'conversion', { 'send_to': 'AW-618620030/clQ5CLnBvo4YEP7I_aYC', 'value': gsf_total_price, 'currency': gsf_shopify_currency, 'transaction_id': gsf_shopify_order_id, 'discount': gsf_shopify_discount, 'items': product_items_data, }); gsfConversionTrackerRecord('GCT_purchase_call'); } gsfConversionTrackerRecord('script_code_end_' + is_thank_you_page + '_' + gsf_shopify_order_id); } function initGSFTrackerJSCode(){ gsfConversionTrackerRecord('google_gtag_js_init'); var gsf_script = document.createElement('script'); gsf_script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-618620030'; document.head.append(gsf_script); gsf_script.onload = initGSFTracker; gsfConversionTrackerRecord('google_gtag_js_load'); } function initGSFTrackerFunction(){ initGSFTrackerJS(); initGSFTrackerJSCode(); } (function() { gsfConversionTrackerRecord('script_code_start'); initGSFTrackerFunction(); })(); 