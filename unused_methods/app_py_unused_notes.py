
# Copyright (c) 2018 Michael Neill Hartman. All rights reserved.
# mnh_license@proton.me
# https://github.com/hartmanm
# oros / overlord (previously openrig.net)

app.py unused notes







class Create_new_password_handler(webapp2.RequestHandler):
    def get(self, id=None):
        if id:
            #verify id  match to customer PASSWORD_RESET_FLAG
            customer = Customer_class.query(Customer_class.PASSWORD_RESET_FLAG == id)
            customer_exists = customer.fetch()
            if len(customer_exists) != 0:
                #later on if in verified ip list then ok

                #verify activate_key = str("attempt from ip:" + ip + "\n\n at: " + time) ??
                #for checked in customer_exists:
                #    in_dict = checked.to_dict()
                #email = json.dumps(in_dict['EMAIL_ADDRESS'])
                #cid = json.dumps(in_dict['CUSTOMER_ID'])

                #c = ndb.Key(urlsafe=cid).get()
                #customer_data = in_dict
                #if 'EMAIL_VERIFIED' in customer_data:
                #    c.EMAIL_VERIFIED="1"
                #c.put()
                #b_d = c.to_dict()
                #b_d['self'] = "/customer/" + cid
                #self.response.write("<br><br>")
                #self.response.write("please login to continue")
                #self.response.write("<br><br>")
                #login_link = OVERLORD + "/login"
                #out_link = "<a href=" + login_link + ">Login</a>"
                #self.response.write(out_link)
                #self.response.set_status(200)
                self.response.write(CREATE_PASSWORD)
                self.response.set_status(200)

            if len(customer_exists) == 0:
                self.response.write(" ")
                self.response.set_status(200)
















                    #past_alert = (int(time) + 240000) - int(r.LAST_ALERT)


                """
                #temp remove after testing
                email_target = "admin@openrig.net"   # swap after testing
                #sendgrid email
                rig_log = "past: " + str(past) + "\n\ntime_mins_sec: " + time_mins_sec + "\n\npast_cycle_without_day_hours: " + past_cycle_without_day_hours + "\n\ncondition " + condition
                #rig_log = "PAST_CYCLE: " + r.PAST_CYCLE + "\n\npast_cycle_day: " + past_cycle_day + "\n\npast_cycle_without_day " + past_cycle_without_day + "\n\nday: " + day + "\n\nBack-end time is: " + time
                sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                from_email = Email("alert@openrig.net")
                to_email = Email(email_target)
                subject = "email alert TEST " + r.RIG_NUMBER + " " + r.USER_ID
                content = Content("text/plain", rig_log)
                mail = Mail(from_email, subject, to_email, content)
                response = sg.client.mail.send.post(request_body=mail.get())
                """

                #adapt_time = 0
                #compare_time = 51000
                # CYCLE is dependent on timezone
                #if int(r.CYCLE) > int(time):
                    #adapt_time = int(time) + 190000
                    #past = int(adapt_time) - int(r.CYCLE)
                    #compare_time = 1000
                    # 50232 5 hours later  need to account for new day split
                #if past > 1000 and day == 32:    #change to below after testing

                #if r.PAST_CYCLE != "FIRST":
                #    past = int(time) - int(r.PAST_CYCLE)
                #if r.PAST_CYCLE == "FIRST":
                #    past = 0
                #PAST_CYCLE time = strftime("%d%H%M%S")
                #if r.LAST_ALERT == "0":
                #    r.LAST_ALERT=time


                    #time = strftime("%H%M%S")
                    #day = strftime("%d")
                #time_mins_sec = time[-4:]

                #LAST_ALERT_mins_sec = (r.LAST_ALERT[-4:]
                # and int(past_cycle_hours) = time_hours

- url: /(.*\.(png|jpg|jpeg))$
  static_files: static/\1

  - url: /images
  static_dir: static/images

- url: /.*
  script: app.app







        """
        def put(self, id=None):     #rm put ???  and use only patch??
        if id:
            c = ndb.Key(urlsafe=id).get()
            customer_data = json.loads(self.request.body)

            if 'my_rigs' in customer_data:
                c.my_rigs.append(customer_data['my_rigs'])
            else:
                c.my_rigs=[]
            if 'basis' in customer_data:
                c.basis=customer_data['basis']
            else:
                c.basis=""
            if 'group1' in customer_data:
                c.group1=customer_data['group1']
            else:
                c.group1=""
            if 'group2' in customer_data:
                c.group2=customer_data['group2']
            else:
                c.group2=""
            if 'group3' in customer_data:
                c.group3=customer_data['group3']
            else:
                c.group3=""
            if 'group4' in customer_data:
                c.group4=customer_data['group4']
            else:
                c.group4=""
            if 'group5' in customer_data:
                c.group5=customer_data['group5']
            else:
                c.group5=""

            c.put()
            c_d = c.to_dict()
            c_d['self'] = "/user/" + id
            self.response.write(json.dumps(c_d))
            self.response.set_status(200)
            """


















    #('/user', User_handler),       # needed?



        """
        def put(self, id=None):    # is this used??
        if id:
            b = ndb.Key(urlsafe=id).get()  # get rig from id Key
            rig_data = json.loads(self.request.body)

            if 'USER_ID' in rig_data:
                b.USER_ID=rig_data['USER_ID']  # replace existing values or
            else:                           #  write default ones
                b.USER_ID=""
            if 'RIG_NUMBER' in rig_data:
                b.RIG_NUMBER=rig_data['RIG_NUMBER']
            else:
                b.RIG_NUMBER=""
            if 'ETC_ADDRESS' in rig_data:
                b.ETC_ADDRESS=rig_data['ETC_ADDRESS']
            else:
                b.ETC_ADDRESS=""
            if 'POWERLIMIT_WATTS' in rig_data:
                b.POWERLIMIT_WATTS=rig_data['POWERLIMIT_WATTS']
            else:
                b.POWERLIMIT_WATTS=""
            if 'CORE_OVERCLOCK' in rig_data:
                b.CORE_OVERCLOCK=rig_data['CORE_OVERCLOCK']
            else:
                b.CORE_OVERCLOCK="0"
            if 'MEMORY_OVERCLOCK' in rig_data:
                b.MEMORY_OVERCLOCK=rig_data['MEMORY_OVERCLOCK']
            else:
                b.MEMORY_OVERCLOCK="800"
            if 'FAN_SPEED' in rig_data:
                b.FAN_SPEED=rig_data['FAN_SPEED']
            else:
                b.FAN_SPEED="49"
            if 'ETH_ADDRESS' in rig_data:
                b.ETH_ADDRESS=rig_data['ETH_ADDRESS']
            else:
                b.ETH_ADDRESS=""
            if 'CHATID' in rig_data:
                b.CHATID=rig_data['CHATID']
            else:
                b.CHATID=""
            if 'APIKEY' in rig_data:
                b.APIKEY=rig_data['APIKEY']
            else:
                b.APIKEY=""
            if 'COIN' in rig_data:
                b.COIN=rig_data['COIN']
            else:
                b.COIN="ETC"
            if 'REBOOT' in rig_data:
                b.REBOOT=rig_data['REBOOT']
            else:
                b.REBOOT="1"
            if 'CLIENT' in rig_data:
                b.CLIENT=rig_data['CLIENT']
            else:
                b.CLIENT="for_advanced_use_only"
            if 'UPDATE' in rig_data:
                b.UPDATE=rig_data['UPDATE']
            else:
                b.UPDATE="1"
            if 'HASHRATE' in rig_data:
                b.HASHRATE=rig_data['HASHRATE']
            else:
                b.HASHRATE="..."
            if 'EXPECTED_HASHRATE' in rig_data:
                b.EXPECTED_HASHRATE=rig_data['EXPECTED_HASHRATE']
            else:
                b.EXPECTED_HASHRATE=""
            if 'RVN_ADDRESS' in rig_data:
                b.RVN_ADDRESS=rig_data['RVN_ADDRESS']
            else:
                b.RVN_ADDRESS=""
            if 'NICE_BTC_ADDRESS' in rig_data:
                b.NICE_BTC_ADDRESS=rig_data['NICE_BTC_ADDRESS']
            else:
                b.NICE_BTC_ADDRESS=""
            if 'ETHASH_SPECIFIC_OC_SETTINGS' in rig_data:
                b.ETHASH_SPECIFIC_OC_SETTINGS=rig_data['ETHASH_SPECIFIC_OC_SETTINGS']
            else:
                b.ETHASH_SPECIFIC_OC_SETTINGS=""
            if 'X16R_SPECIFIC_OC_SETTINGS' in rig_data:
                b.X16R_SPECIFIC_OC_SETTINGS=rig_data['X16R_SPECIFIC_OC_SETTINGS']
            else:
                b.X16R_SPECIFIC_OC_SETTINGS=""
            if 'GROUP_NUMBER' in rig_data:
                b.GROUP_NUMBER=rig_data['GROUP_NUMBER']
            else:
                b.GROUP_NUMBER=""
            if 'CYCLE' in rig_data:
                b.CYCLE=rig_data['CYCLE']
            else:
                b.CYCLE=""
            if 'PAST_CYCLE' in rig_data:
                b.PAST_CYCLE=rig_data['PAST_CYCLE']
            else:
                b.PAST_CYCLE=""
            if 'ANON_ADDRESS' in rig_data:
                b.ANON_ADDRESS=rig_data['ANON_ADDRESS']
            else:
                b.ANON_ADDRESS=""
            if 'ZHASH_SPECIFIC_OC_SETTINGS' in rig_data:
                b.ZHASH_SPECIFIC_OC_SETTINGS=rig_data['ZHASH_SPECIFIC_OC_SETTINGS']
            else:
                b.ZHASH_SPECIFIC_OC_SETTINGS=""
            if 'VERSION' in rig_data:
                b.VERSION=rig_data['VERSION']
            else:
                b.VERSION=""
            if 'NUMBER_OF_GPUS' in rig_data:
                b.NUMBER_OF_GPUS=rig_data['NUMBER_OF_GPUS']
            else:
                b.NUMBER_OF_GPUS=""
            if 'AION_ADDRESS' in rig_data:
                b.AION_ADDRESS=rig_data['AION_ADDRESS']
            else:
                b.AION_ADDRESS=""
            if 'BTG_ADDRESS' in rig_data:
                b.BTG_ADDRESS=rig_data['BTG_ADDRESS']
            else:
                b.BTG_ADDRESS=""
            if 'USE_ALGO_SPECIFIC_OC' in rig_data:
                b.USE_ALGO_SPECIFIC_OC=rig_data['USE_ALGO_SPECIFIC_OC']
            else:
                b.USE_ALGO_SPECIFIC_OC=""
            if 'ETC_POOL' in rig_data:
                b.ETC_POOL=rig_data['ETC_POOL']
            else:
                b.ETC_POOL=""
            if 'ETH_POOL' in rig_data:
                b.ETH_POOL=rig_data['ETH_POOL']
            else:
                b.ETH_POOL=""
            if 'RVN_POOL' in rig_data:
                b.RVN_POOL=rig_data['RVN_POOL']
            else:
                b.RVN_POOL=""
            if 'ANON_POOL' in rig_data:
                b.ANON_POOL=rig_data['ANON_POOL']
            else:
                b.ANON_POOL=""
            if 'AION_POOL' in rig_data:
                b.AION_POOL=rig_data['AION_POOL']
            else:
                b.AION_POOL=""
            if 'BTG_POOL' in rig_data:
                b.BTG_POOL=rig_data['BTG_POOL']
            else:
                b.BTG_POOL=""
            if 'NICE_X16R_POOL' in rig_data:
                b.NICE_X16R_POOL=rig_data['NICE_X16R_POOL']
            else:
                b.NICE_X16R_POOL=""
            if 'NICE_ZHASH_POOL' in rig_data:
                b.NICE_ZHASH_POOL=rig_data['NICE_ZHASH_POOL']
            else:
                b.NICE_ZHASH_POOL=""

            b.put()
            b_d = b.to_dict()
            b_d['self'] = "/rigs/" + id
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)
            """

































rig handler (get)


        #else:   #all rigs
        #    checkedList = list()
        #    for checked in grabAll:
        #        in_dict = checked.to_dict()
        #        in_dict['self'] = '/rigs/' + checked.key.urlsafe()
        #        checkedList.append(in_dict)
        #    self.response.write(json.dumps(in_dict))
        #    self.response.set_status(200)






















user handler (post)



def post(self):   #rm post??
    customer_data = json.loads(self.request.body)
    new_customer = Users_class(
                             #name=customer_data['name'], # Users_class constructor
                            # electric_usage="0",
                            # given_kwh_cost="0.1",
                             my_rigs=[],
                             basis="",
                             group1="",
                             group2="",
                             group3="",
                             group4="",
                             group5="")
                             #basis="")
    new_customer.put()
    customer_dict = new_customer.to_dict()
    customer_dict['self'] = '/user/' + new_customer.key.urlsafe()
    customer_dict['id'] = new_customer.key.urlsafe() # add self and id properties
#       self.response.write(json.dumps(customer_dict))                                   #for response will all data
    self.response.write(json.dumps(customer_dict['id']))                           #for response will only id
# change with HASH??
#        self.response.write("isGO")
    self.response.set_status(201)






user handler (put)




        #    if 'name' in customer_data:
        #        c.name=customer_data['name']  # replace existing values or
        #    else:                             #  use default ones
        #        c.name=""
        #    if 'electric_usage' in customer_data:
        #        c.electric_usage=customer_data['electric_usage']
        #    else:
        #        c.electric_usage=0.0
        #    if 'given_kwh_cost' in customer_data:
        #        c.given_kwh_cost=customer_data['given_kwh_cost']
        #    else:
        #        c.given_kwh_cost=0.0








user handler (put)



        #    if 'name' in customer_data:
        #        c.name=customer_data['name']   # replace existing values if
        #    if 'electric_usage' in customer_data:     #  if provided with new ones
        #        c.electric_usage=customer_data['electric_usage']
        #    if 'given_kwh_cost' in customer_data:     #  if provided with new ones
        #        c.given_kwh_cost=customer_data['given_kwh_cost']








user handler (get)





#        else:
#            grabAll = Users_class.query()  # return [] if no user
#            user = grabAll.fetch()
#            if len(user)<1:
#                self.response.write([])
#                self.response.set_status(200)

#            checkedList = list()
#            grabAll = Users_class.query()  # return /user
#            for customer in grabAll:
#                cust_dict = customer.to_dict()
#                cust_dict['self'] = '/user/' + customer.key.urlsafe()
#                cust_dict['id'] = customer.key.urlsafe()
#                checkedList.append(cust_dict)
#                self.response.write(json.dumps(cust_dict))
#                self.response.set_status(200)

#    def delete(self, id=None):
        #self.response.headers['Access-Control-Allow-Origin']='*'
#        if id:
#            c = ndb.Key(urlsafe=id).get()  # delete a specific user
#            c.key.delete()
#            self.response.write("user deleted")
#            self.response.set_status(200)

# enable to allow deleting all Users

#        else:
#            grabAll = Users_class.query()  # delete all user
#            for customer in grabAll:
#                customer.key.delete()
#                self.response.write("user deleted")




























login handler (post)


            #self.response.write(customer_data)
            #self.response.write("<br>")
            #self.response.write(target_email)
            #self.response.write("<br>")
            #self.response.write(in_dict['EMAIL_ADDRESS'])
            #self.response.write("<br>")
            #self.response.write(hex_result)
            #self.response.write("<br>")
            #self.response.write(in_dict['PASSWORD'])
            #self.response.write("<br>")
            #self.response.write(in_dict['EMAIL_VERIFIED'])
            #self.response.write("<br>")

                        #self.response.write("<br><br>")
                        #self.response.write(customer_data['SESSION_KEY'])
                        #self.response.write("<br><br>")
                        #self.response.write(shex_result)


                        self.response.write("<br><br>")
                        self.response.write("session key updated")

                        li = customer_data['LOGGED_IN']
                        self.response.write("<br>")
                        self.response.write(li)

                        self.response.write("<br>")
                        self.response.write("email verified")
                        self.response.write("<br>")
                        self.response.write("password verified")


                        #requestURL = urllib.urlencode(url) # encode the parameters with libary
                        #result = urlfetch.fetch(requestURL)  # urlfetch get redirect to google
                        #self.response.write(result.content)
                        #r = requests.post(url, data = {'SESSION_KEY':c.SESSION_KEY})
                        #r = requests.get(url)

                        #self.response.write(r.content)

                        #self.response.set_status(200)
                        #redirect to user page via login clientside

                        # get ip ??


                        #or


                        #url = str(OVERLORD + "/dashboard/S" + c.SESSION_KEY)   # plus ip ??
                        #self.redirect(url, True)

                        """
                        clientSecret = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for x in range(48))

                        init = {
                                "response_type": "code",
                                "client_id": CLIENT_ID,
                                "redirect_uri": REDIRECT_URI, # parameters for get
                                "scope": "email",
                                "state": clientSecret
                                }

                        global temp
                        temp = clientSecret

                        requestURL = URL1 + urllib.urlencode(init) # encode the parameters with libary
                        result = urlfetch.fetch(requestURL)  # urlfetch get redirect to google
                        #self.response.write(result.content)
                        """



                        #self.response.write("<br>")
                        #self.response.write(c.LOGGED_IN)














customers



    def get(self, id=None):                                                              ## remove later
        if id:
            b = ndb.Key(urlsafe=id).get()
            b_d = b.to_dict()
            b_d['self'] = "/customer/" + id  # add auth?
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)




    def patch(self, id=None):  #rm  any need for this at all??
        if id:
            b = ndb.Key(urlsafe=id).get()
            customer_data = json.loads(self.request.body)

        #    if 'USER_ID' in customer_data:
        #        b.USER_ID=customer_data['USER_ID']
            if 'EMAIL_VERIFIED' in customer_data:
                b.EMAIL_VERIFIED=customer_data['EMAIL_VERIFIED']

            b.put()
            b_d = b.to_dict()
            b_d['self'] = "/customer/" + id
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)




















        #self.response.headers['Access-Control-Allow-Origin']='*'
    #    if cid:
    #        c = ndb.Key(urlsafe=cid).get()
#
#            if ckid:
#                b = ndb.Key(urlsafe=ckid).get()
#                customer_data = json.loads(self.request.body)
#                b.put()
#                b_d = b.to_dict()
#                b_d['self'] = "/customer/" + ckid
#                self.response.write(json.dumps(b_d))
#                self.response.set_status(200)




            #self.response.write(json.dumps(activate_dict))


        #setup customer
    #    signup_dict = new_signup.to_dict()
    #    signup_dict['id'] = new_signup.key.urlsafe()
    #    signup_dict['self'] = '/customer/' + new_signup.key.urlsafe()  # rm later ?
    #    self.response.set_status(201)


#def patch(self, cid=None, ckid=None):
    #self.response.headers['Access-Control-Allow-Origin']='*'
#    if cid:
#        c = ndb.Key(urlsafe=cid).get()

#        if ckid:
#            b = ndb.Key(urlsafe=ckid).get()  # if a specific customer + key verify if works
#            b_d = b.to_dict()
#            b_d['self'] = "/customer/" + ckid
#            self.response.write(json.dumps(b_d))
#            self.response.set_status(200)
    #self.response.headers['Access-Control-Allow-Origin']='*'   # rm all get later

#    grabAll = Customer_class.query()
#    customers = grabAll.fetch()
#    if len(customers)<1:
#        self.response.write([])
#        self.response.set_status(200)


#    checkedList = list()
#    for checked in grabAll:
#        in_dict = checked.to_dict()
#        in_dict['self'] = '/customers/' + checked.key.urlsafe()
#        checkedList.append(in_dict)
#    self.response.write(json.dumps(in_dict))
#    self.response.set_status(200)
