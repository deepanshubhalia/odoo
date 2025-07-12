website called ReWear which is a community clothing exchange, it enables users to exchange unused clothing, maybe swap their useless clothing for a better one from someone else who likes the user's clothing.

Flow: the user registers then logs in, lists their item, opens their feed of available/swappable items , accepts a few(sends swap request) , very soon at least one or a few other users also match with the swap, the first user can now see swap accepted and can choose which swap to initiate, they initiate a swap then all other accepted swaps are revoked. now user can see contact details of the other person with whom their swap was initiated. there are 2 user roles one is user, other is admin. 

admin can 1.moderate and approve/ reject user listing , 2.remove inappropriate or spam items, 3. manage users, manage listings , manage orders(swap initiated). 

the user can 1.set product image ,gallery, description , 2.see user dashboard my listings, my purchases, personal details, 3. watch their feed of listed items/ search for specific item in category , 4. when they click on an item on their feed, its opens up a page similar to the "item listing" page which the user has made for their own item.

pages: 
page 1 Signup,  
page 2 login, 
page 2.5 DASHBOARD only for the ADMIN. If not Admin, page 3 opens
page 3 landing page FOR USER containing links to all other pages like categories, list my own item, open user dashboard via navbar logo, 
page 4 user dashboard containing my matches, my listings , my personal details, user must list atleast one item first before they can visit page 6,
page 5 List your item , now redirect to page 6
page 6 What others have listed, click on an item to go to page 7.
page 7 Product listing page (viewing other's item)
page 8. MY matches page containing 3 sections: 
1. ACCEPTED MATCHES(orders placed) – shows the matches approved by the user or others approved users request, 
2.MY REQUESTS – shows requests sent by the user, 
3. REQUESTS RECEIVED – shows requests received by the user, sent by others,
In Requests received section, if an item with product_id=1 is accepted, all other requests with product_id=1 will be revoked.
