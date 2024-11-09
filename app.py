# Copyright (c) 2018 Michael Neill Hartman. All rights reserved.
# mnh_license@proton.me
# https://github.com/hartmanm
# oros / overlord (previously openrig.net)

from google.appengine.ext import ndb
import webapp2
import json
import random
import string
import hashlib
import os
import requests
import sendgrid
from sendgrid.helpers.mail import *
from time import gmtime, strftime
import httplib
from google.appengine.api import urlfetch
import urllib

HOMEPAGE = open('home.html').read()
SIGNUP = open('signup.html').read()
UPDATE = open('update.html').read()
LOGIN = open('login.html').read()
LOGOUT = open('logout.html').read()
RIGLIST = open('riglist.html').read()
BASIS = open('basis.html').read()
ADDGROUP = open('addgroup.html').read()
EDITGROUP = open('editgroup.html').read()
ADDRIG = open('addrig.html').read()
EDITRIG = open('editrig.html').read()
PASSWORD_RESET = open('password_reset.html').read()
CREATE_PASSWORD = open('create_password.html').read()
SETUP_GUIDE = open('setup_guide.html').read()
FAQ = open('faq.html').read()
TEST = open('test.html').read()
WGUIDE = open('w10.html').read()
ONEBASH = open('1bash.html').read()
THREEWATCHDOG = open('3watchdog.html').read()
FULLZERO = open('time_sch_1.html').read()
IP_RESTRICTED = open('non_us_ip.html').read()
DOWNLOADS = open('downloads.html').read()

OVERLORD = "https://openrig.net"
MASH = "IDKitGeMtYOW52c33d3498A164p"
SENDGRID = "https://api.sendgrid.com/v3/mail/send"
SENDGRID_API_KEY=""

CURRENT_IMAGE="1.4"
DEV_CHOICE = "RVN"
DEV_ROUTE = "4YoKAE6af3378379823466sdlk6fha63sl5krbq1EO5JAS46OFJ7ADSF203DXUE74Gfit"
DEV_RVN_ADDR = "";
DEV_RVN_POOL = "stratum+tcp://rvn-us-east1.nanopool.org:12222";
DEV_SECRET = "7234987XNzGICAgIDA4YoKAEXUE7GfitGeMDDitY0ffOriVaf3378398234603DbfA164dcpAedL2ZXJsb3JkLW52chcL6A9J64"
WHITELIST = "DISABLEDppppppppppppppp"

# email alerts checks all rigs CYCLE against back-end time
# called by Rig_handler(patch) ie hashrate updates
# last tested 2019-03-10
# not tested after 2100
def email_alert():
    customer = Customer_class.query()
    customer_exists = customer.fetch()
    day = strftime("%d")
    time_mins = strftime("%M")
    time_hours = strftime("%H")
    time = strftime("%d%H%M%S")
    if len(customer_exists) != 0:
        for checked in customer_exists:
            in_dict = checked.to_dict()
            uid = json.dumps(in_dict['USER_ID'])
            u = ndb.Key(urlsafe=uid).get()
            riglist = u.my_rigs
            u.put()
            u_d = u.to_dict()
            u_d['self'] = "/user/" + uid
            for link in riglist:
                link = link[6:]
                rid = link
                r = ndb.Key(urlsafe=rid).get()
                past_cycle_day = r.PAST_CYCLE[:2]
                past_cycle_without_day = r.PAST_CYCLE[-6:]

                temp = r.PAST_CYCLE[-4:-2]
                for ch in temp:
                    if ch == '"':
                        temp = temp.replace(ch,"")
                for ch in temp:
                    if ch == "'":
                        temp = temp.replace(ch,"")
                temp2 = time_mins
                for ch in temp2:
                    if ch == '"':
                        temp2 = temp2.replace(ch,"")
                for ch in temp2:
                    if ch == "'":
                        temp2 = temp2.replace(ch,"")

                past_cycle_without_day_hours = temp #seconds also rm
                if past_cycle_without_day_hours ==  "" or '':
                    past_cycle_without_day_hours=0
                time_without_day_hours=temp2
                if time_without_day_hours ==  "" or '':
                    time_without_day_hours=0
                past_cycle_hours = past_cycle_without_day[:2]

                if day == past_cycle_day:
                    past = int(time_without_day_hours) - int(past_cycle_without_day_hours)
                if day != past_cycle_day:
                    if past_cycle_without_day_hours != "" or '':
                        past = (int(time_without_day_hours) + 1440) - int(past_cycle_without_day_hours)
                    else:
                        past = (int(time_without_day_hours) + 1440)
                    if time_without_day_hours == "" or '':
                        past = 1440
                if past_cycle_hours != time_hours:
                    past = (int(time_without_day_hours) + 60) - int(past_cycle_without_day_hours)

                if past > 10 and r.LAST_ALERT == "0":
                    if r.DEV_WATCH == "YES":
                        #sendgrid email
                        rig_log = "Dev Watch Alert: No response from user " + r.USER_ID + " rig# " + r.RIG_NUMBER + " in the last 10 minutes." + "\n\nLast Response was at: " + r.PAST_CYCLE + "\n\nBack-end time is: " + time
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("alert@openrig.net")
                        to_email = Email("admin@openrig.net")
                        subject = "DWA No response from users rig# " + r.RIG_NUMBER
                        content = Content("text/plain", rig_log)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())
                    if r.EMAIL_UPDATES == "YES" and u.dev_flag == "0":
                        email_target = str(in_dict['EMAIL_ADDRESS'])
                        #sendgrid email
                        rig_log = "No response from rig# " + r.RIG_NUMBER + " in the last 10 minutes." + "\n\nLast Response was at: " + r.PAST_CYCLE + "\n\nBack-end time is: " + time
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("alert@openrig.net")
                        to_email = Email(email_target)
                        subject = "No response from rig# " + r.RIG_NUMBER
                        content = Content("text/plain", rig_log)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())
                    r.LAST_ALERT="1"
                    r.HASHRATE="0"
                    r.put()
                    r_d = r.to_dict()
                    r_d['self'] = "/rigs/" + rid

# auto_logout logs out users that have been online longer than an hour (because of call at 59 mins it will be 2 hours)
# called by Rig_handler(patch) ie hashrate updates
# last tested
# not tested after 2100
def auto_logout():
    customer = Customer_class.query()
    customer_exists = customer.fetch()
    time = strftime("%H%M%S")
    time_without_hours = strftime("%M")
    hours = strftime("%H")
    if len(customer_exists) != 0:
        for checked in customer_exists:
            in_dict = checked.to_dict()
            uid = json.dumps(in_dict['USER_ID'])
            u = ndb.Key(urlsafe=uid).get()
            riglist = u.my_rigs
            u.put()
            u_d = u.to_dict()
            u_d['self'] = "/user/" + uid
            cid = json.dumps(in_dict['CUSTOMER_ID'])
            c = ndb.Key(urlsafe=cid).get()
            if c.LOGGED_IN == "1":
                customer_data = in_dict
                # current times
                # #above time_without_hours = time[-2:-2] #or seconds [2:-2]
                #if(time[-2:-2] == ""){time_without_hours=0}
                hours_in_minutes=int(hours) * int(60)
                total_minutes_time=int(time_without_hours) + int(hours_in_minutes)
                # session start times
                #session_start=json.dumps(in_dict['SESSION_START'])
                # access directly

                ###
                session_start=c.SESSION_START


                # 176 needs str
                #session_start=int(session_start)



                temp=session_start


                for ch in temp:
                    if ch == '"':
                        temp = temp.replace(ch,"")
                for ch in temp:
                    if ch == "'":
                        temp = temp.replace(ch,"")

                temp=session_start[:-4] #[:2]

                # need to rm unterminated string: "
                # err below
                if temp != "0" and temp != "":
                    session_start_hours=int(temp)
                else:
                    session_start_hours=1



                temp2=session_start


                for ch in temp2:
                    if ch == '"':
                        temp2 = temp2.replace(ch,"")
                for ch in temp2:
                    if ch == "'":
                        temp2 = temp2.replace(ch,"")


                #temp2=session_start[-2:-2]
                temp2=session_start[:-2]
                temp2=temp2[:-2]




                #test email
                #activate_url = str("temp: " + temp + "temp2: " + temp2)
                #sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                #from_email = Email("info@openrig.net")
                #to_email = Email("admin@openrig.net")
                #subject = "test unterm"
                #content = Content("text/plain", activate_url)
                #mail = Mail(from_email, subject, to_email, content)
                #response = sg.client.mail.send.post(request_body=mail.get())
                #test email




                if temp2 != "0" and temp2 != "":
                    session_start_without_hours=int(temp2)
                else:
                    session_start_without_hours=1




                #test email
                #description = "test: "
                #activate_url = str("temp2: " + temp2 + "session_start: " + session_start)
                #sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                #from_email = Email("info@openrig.net")
                #to_email = Email("admin@openrig.net")
                #subject = "test unterm"
                #content = Content("text/plain", activate_url)
                #mail = Mail(from_email, subject, to_email, content)
                #response = sg.client.mail.send.post(request_body=mail.get())
                #test email


                # above# session_start_without_hours=int(temp2) #or seconds
                session_start_hours_in_minutes=int(session_start_hours)*60
                total_minutes_session_start=int(session_start_without_hours) + int(session_start_hours_in_minutes)

                if int(hours) >= 5:
                    past = int(total_minutes_time) - int(total_minutes_session_start)
                if int(hours) < 5:
                    past = int(total_minutes_time) + 1140 - int(total_minutes_session_start)


                # 18 23 03     1103
                # 18 59 34     1139
                # 04 34 10      272


                #test email
                #description = "test: "
                #activate_url = str("at: " + str(time) + "  " + '\n\n' + "time: " + str(time)
                #+ '\n\n' + "hours: " + str(hours) + '\n\n' + "time_without_hours: " + str(time_without_hours)
                #+ '\n\n' + "hours_in_minutes: " + str(hours_in_minutes) + '\n\n' + "total_minutes_time: " + str(total_minutes_time)
                #+ '\n\n' + "session_start: " + str(session_start) + '\n\n' + "session_start_hours: " + str(session_start_hours)
                #+ '\n\n' + "temp2: " + str(temp2) + '\n\n' + "session_start_without_hours: " + str(session_start_without_hours)
                #+ '\n\n' + "session_start_hours_in_minutes: " + str(session_start_hours_in_minutes)
                #+ '\n\n' + "total_minutes_session_start: " + str(total_minutes_session_start)
                #+ '\n\n' + "past: " + str(past))
                #sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                #from_email = Email("info@openrig.net")
                #to_email = Email("admin@openrig.net")
                #subject = "test unterm"
                #content = Content("text/plain", activate_url)
                #mail = Mail(from_email, subject, to_email, content)
                #response = sg.client.mail.send.post(request_body=mail.get())
                #test email

                if past > 60 and c.LOGGED_IN == "1":
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid


                    #sendgrid email
                    description = "user: " + uid + " logged out"
                    activate_url = str("at: " + time + "  " + description)
                    sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                    from_email = Email("info@openrig.net")
                    to_email = Email("admin@openrig.net")
                    subject = "user logged out"
                    content = Content("text/plain", activate_url)
                    mail = Mail(from_email, subject, to_email, content)
                    response = sg.client.mail.send.post(request_body=mail.get())


# returns 1 if IP originates in US, else returns 0
def grep_US(ip):
    #request arin
    # add SSL module to use https
    #url = 'https://whois.arin.net/rest/ip/' + ip

    # via requests
    #url = 'http://whois.arin.net/rest/ip/' + ip
    #headers = {"Accept": "text/plain"}
    #r = requests.get(url, headers=headers)
    #t=r.text

    headers = {"Accept": "text/plain"}
    result = urlfetch.fetch(
        url='https://whois.arin.net/rest/ip/' + ip,
        method=urlfetch.GET,
        headers=headers)

    #outdata = json.loads(result.content)
    #token = outdata['id']
    t = result.content

    yes=1
    u="APNIC"
    x=t.find(u)
    if x > -1:
        yes=0

    u="AFRINIC"
    x=t.find(u)
    if x > -1:
        yes=0

    u="LACNIC"
    x=t.find(u)
    if x > -1:
        yes=0

    u="RIPE NCC"
    x=t.find(u)
    if x > -1:
        yes=0

    u="Allocated"
    x=t.find(u)
    if x > -1:
        yes=0

    if yes == 0:
        return 0
    return 1


# not used yet
class Devfee_tracker_class(ndb.Model):
    id = ndb.KeyProperty()
    fee_executed = ndb.StringProperty()
    fee_start = ndb.StringProperty()
    fee_end = ndb.StringProperty()

# not used yet
# contains incorrect references
def auto_dev_fee():
    if start_or_end == "S":    # start devfee

        # create new Devfee_tracker_class entity
        time = strftime("%Y-%m-%d_%H-%M-%S")
        activate_data = {'START_KEY': "0"}
        activate_key = str("customer created from ip: " + ip + "\n\n" + time)
        activate_data['START_KEY'] = activate_key
        new_activate_data = Devfee_tracker_class(fee_executed="0",CUSTOMER_ID=signup_dict['id'])
        new_activate_data.put()
        activate_dict = new_activate_data.to_dict()
        activate_dict['self'] = '/activate/' +  new_activate_data.key.urlsafe()
        activate_dict['id'] = new_activate_data.key.urlsafe()


        if session == DEV_SECRET:
            #sendgrid email
            activate_url = str("dev_fee started at: " + time)
            sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
            from_email = Email("info@openrig.net")
            to_email = Email("admin@openrig.net")
            subject = "dev_fee started"
            content = Content("text/plain", activate_url)
            mail = Mail(from_email, subject, to_email, content)
            response = sg.client.mail.send.post(request_body=mail.get())

            customer = Customer_class.query()
            customer_exists = customer.fetch()
            if len(customer_exists) != 0:
                for checked in customer_exists:
                    in_dict = checked.to_dict()
                    uid = json.dumps(in_dict['USER_ID'])
                    u = ndb.Key(urlsafe=uid).get()
                    u.dev_flag="1"
                    riglist = u.my_rigs
                    u.put()
                    u_d = u.to_dict()
                    u_d['self'] = "/user/" + uid
                    for link in riglist:
                        link = link[6:]
                        rid = link
                        r = ndb.Key(urlsafe=rid).get()

                        if(r.DAILY_DEV_FEE != "1"):

                            r.DEV_COIN=r.COIN
                            r.DEV_NUMBER=r.RIG_NUMBER

                            if DEV_CHOICE == "RVN":
                                r.DEV_POOL=r.RVN_POOL
                                r.DEV_ADDRESS=r.RVN_ADDRESS
                                r.DEV_NANOPOOL_EMAIL=r.NANOPOOL_EMAIL
                                r.RVN_POOL=DEV_RVN_POOL
                                r.RVN_ADDRESS=DEV_RVN_ADDR
                                r.NANOPOOL_EMAIL=""
                                r.COIN="RVN"

                            tracker1 = rid[0:1]
                            tracker2 = rid[20:21]
                            tracker3 = rid[26:27]
                            tracker4 = rid[34:35]
                            tracker5 = rid[-5:-3]
                            tracker6 = rid[-10:-11]
                            tracker7 = rid[-15:-16]
                            tracker = str(tracker1 + tracker2 + tracker3 + tracker4 + tracker5 + tracker6 + tracker7 + "_" + r.RIG_NUMBER)
                            r.RIG_NUMBER=tracker
                            r.DAILY_DEV_FEE="1"

                            r.put()
                            r_d = r.to_dict()
                            r_d['self'] = "/rigs/" + rid

    if start_or_end == "E":     # end dev fee
        if session == DEV_SECRET:
            #sendgrid email
            activate_url = str("dev_fee ended at: " + time)
            sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
            from_email = Email("info@openrig.net")
            to_email = Email("admin@openrig.net")
            subject = "dev_fee ended"
            content = Content("text/plain", activate_url)
            mail = Mail(from_email, subject, to_email, content)
            response = sg.client.mail.send.post(request_body=mail.get())

            customer = Customer_class.query()
            customer_exists = customer.fetch()
            if len(customer_exists) != 0:
                for checked in customer_exists:
                    in_dict = checked.to_dict()
                    uid = json.dumps(in_dict['USER_ID'])
                    u = ndb.Key(urlsafe=uid).get()
                    u.dev_flag="0"
                    riglist = u.my_rigs
                    u.put()
                    u_d = u.to_dict()
                    u_d['self'] = "/user/" + uid

                    for link in riglist:
                        link = link[6:]
                        rid = link
                        r = ndb.Key(urlsafe=rid).get()

                        # ETC
                        #if r.COIN == "ETC":
                        #    r.ETC_ADDRESS=r.DEV_ADDRESS
                        #    r.ETC_POOL=r.DEV_POOL

                        #RVN
                        if r.COIN == "RVN":
                            r.RVN_ADDRESS=r.DEV_ADDRESS
                            r.RVN_POOL=r.DEV_POOL
                            r.NANOPOOL_EMAIL=r.DEV_NANOPOOL_EMAIL

                        r.COIN=r.DEV_COIN
                        r.RIG_NUMBER=r.DEV_NUMBER
                        r.DEV_POOL=""
                        r.DEV_ADDRESS=""
                        r.DEV_COIN=""
                        r.DEV_NUMBER=""
                        r.DEV_NANOPOOL_EMAIL=""
                        #r.DEV_NICE_BTC_ADDRESS=""

                        r.put()
                        r_d = r.to_dict()
                        r_d['self'] = "/rigs/" + rid


# manually activated functions
class Dev_fee(webapp2.RequestHandler):
    def get(self, id=None):
        if id:
            ip = str(self.request.remote_addr)
            time = strftime("%H%M%S")
            daytime = strftime("%d%H%M%S")
            if WHITELIST == ip:
                session = id[1:]
                start_or_end = id[0]
                uid = ""
                riglist = ""

                if start_or_end == "O": #force logout a specific customer:
                    if session == DEV_SECRET:

                        customer = Customer_class.query()
                        customer_exists = customer.fetch()
                        if len(customer_exists) != 0:
                            for checked in customer_exists:
                                in_dict = checked.to_dict()
                                uid = json.dumps(in_dict['USER_ID'])
                                u = ndb.Key(urlsafe=uid).get()
                                riglist = u.my_rigs
                                u.put()
                                u_d = u.to_dict()
                                u_d['self'] = "/user/" + uid
                                cid = json.dumps(in_dict['CUSTOMER_ID'])
                                c = ndb.Key(urlsafe=cid).get()
                                customer_data = in_dict
                                # for a specific customer:

                                # update session key, start, loggedin flag
                                if c.CUSTOMER_ID == "ag1wfm92ZXJsb3JkLW52chsLEg5DdXN0b21lcl9jbGFzcxiAgIDgxK6dCgw":
                                    if 'SESSION_KEY' in customer_data:
                                        if 'LAST_SESSION_KEY' in customer_data:
                                            c.LAST_SESSION_KEY=c.SESSION_KEY
                                        c.SESSION_KEY="loggedout" + MASH
                                    if 'SESSION_AUTH' in customer_data:
                                        c.SESSION_AUTH="loggedout" + MASH
                                    if 'SESSION_START' in customer_data:
                                        c.SESSION_START="0"
                                    if 'LOGGED_IN' in customer_data:
                                        c.LOGGED_IN="0"
                                    c.put()
                                    c_d = c.to_dict()
                                    c_d['self'] = "/customer/" + cid
                                    self.response.write(c.CUSTOMER_ID + " logged out")

                                    #sendgrid email
                                    description = "user: " + uid + " logged out"
                                    activate_url = str("at: " + time + "  " + description)
                                    sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                                    from_email = Email("info@openrig.net")
                                    to_email = Email("admin@openrig.net")
                                    subject = "user logged out"
                                    content = Content("text/plain", activate_url)
                                    mail = Mail(from_email, subject, to_email, content)
                                    response = sg.client.mail.send.post(request_body=mail.get())


                if start_or_end == "F": #force logout
                    if session == DEV_SECRET:

                        customer = Customer_class.query()
                        customer_exists = customer.fetch()
                        if len(customer_exists) != 0:
                            for checked in customer_exists:
                                in_dict = checked.to_dict()
                                uid = json.dumps(in_dict['USER_ID'])
                                u = ndb.Key(urlsafe=uid).get()
                                riglist = u.my_rigs
                                u.put()
                                u_d = u.to_dict()
                                u_d['self'] = "/user/" + uid
                                cid = json.dumps(in_dict['CUSTOMER_ID'])
                                c = ndb.Key(urlsafe=cid).get()
                                customer_data = in_dict

                                # update session key, start, loggedin flag
                                if 'SESSION_KEY' in customer_data:
                                    if 'LAST_SESSION_KEY' in customer_data:
                                        c.LAST_SESSION_KEY=c.SESSION_KEY
                                    c.SESSION_KEY="loggedout" + MASH
                                if 'SESSION_AUTH' in customer_data:
                                    c.SESSION_AUTH="loggedout" + MASH
                                if 'SESSION_START' in customer_data:
                                    c.SESSION_START="0"
                                if 'LOGGED_IN' in customer_data:
                                    c.LOGGED_IN="0"
                                c.put()
                                b_d = c.to_dict()
                                b_d['self'] = "/customer/" + cid
                                self.response.set_status(201)

                                #sendgrid email
                                description = "user: " + uid + " logged out"
                                activate_url = str("at: " + time + "  " + description)
                                sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                                from_email = Email("info@openrig.net")
                                to_email = Email("admin@openrig.net")
                                subject = "user logged out"
                                content = Content("text/plain", activate_url)
                                mail = Mail(from_email, subject, to_email, content)
                                response = sg.client.mail.send.post(request_body=mail.get())


                if start_or_end == "U":  # update
                    if session == DEV_SECRET:
                        #sendgrid email
                        #description = "update adds DEV_NICE_BTC_ADDRESS to all rigs"
                        description = "updates adds values for all rigs"
                        activate_url = str("system update at: " + time + "  " + description)
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("info@openrig.net")
                        to_email = Email("admin@openrig.net")
                        subject = "update"
                        content = Content("text/plain", activate_url)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())

                        customer = Customer_class.query()
                        customer_exists = customer.fetch()
                        if len(customer_exists) != 0:
                            for checked in customer_exists:
                                in_dict = checked.to_dict()
                                uid = json.dumps(in_dict['USER_ID'])
                                u = ndb.Key(urlsafe=uid).get()

                                #CUSTOMER CHANGES
                                #cid = json.dumps(in_dict['CUSTOMER_ID'])
                                #c = ndb.Key(urlsafe=cid).get()
                                #c.LAST_SESSION_KEY=""
                                #c.put()
                                #c_d = c.to_dict()
                                #c_d['self'] = "/customer/" + cid
                                #self.response.write("updated" + "<br>")


                                #self.response.write(uid)
                                #self.response.write("<br>")
                                #u.dev_flag="1"
                                #self.response.write(u.dev_flag)
                                #self.response.write("<br>")
                                riglist = u.my_rigs
                                u.put()
                                u_d = u.to_dict()
                                u_d['self'] = "/user/" + uid
                                #self.response.write(json.dumps(u_d))
                                #u = ndb.Key(urlsafe=uid).get()
                                #self.response.write(u)
                                #self.response.write("<br>")
                                for link in riglist:
                                    link = link[6:]
                                    #self.response.write(link + "<br>")
                                    rid = link
                                    r = ndb.Key(urlsafe=rid).get()

                                    r.RE2UNIX=""
                                    #r.BASE_VERSION=CURRENT_IMAGE
                                    #r.ZERO_WRITE_MODE="1"
                                    #r.RIG_IP=""
                                    #r.RIG_MAC=""
                                    #r.PAST_CYCLE=daytime
                                    #r.EMAIL_UPDATES="YES"
                                    #r.NICE_grincuckaroo29_POOL="grincuckaroo29.usa.nicehash.com:3371"
                                    self.response.write("added: RE2UNIX" + "<br>")


                                    r.put()
                                    r_d = r.to_dict()
                                    r_d['self'] = "/rigs/" + rid
                                    #self.response.write(json.dumps(r_d))
                                    #self.response.write("S&nbsp")

                """
                if start_or_end == "D":
                    # output all customers
                    grabAll = Customer_class.query()
                    all = grabAll.fetch()
                    checkedList = list()
                    for checked in grabAll:
                        in_dict = checked.to_dict()
                        in_dict['self'] = '/customers/' + checked.key.urlsafe()
                        checkedList.append(in_dict)
                    self.response.write(json.dumps(in_dict))
                    self.response.set_status(200)

                    #delete all customers and activates
                    grabAll = Customer_class.query()  # delete all customers
                    for customerx in grabAll:
                        customerx.key.delete()
                        self.response.write("customer deleted")

                    grabAll = Activate_class.query()  # delete all activate logs
                    for activate in grabAll:
                        activate.key.delete()
                        self.response.write("activate log deleted")

                    grabAll = Reset_log_class.query()  # delete all reset logs
                    for reset in grabAll:
                        reset.key.delete()
                        self.response.write("reset log deleted")

                    #delete all rigs and users
                    grabAll = Rigs_class.query()  # delete all rigs
                    for rig in grabAll:
                        rig.key.delete()
                        self.response.write("rig deleted")


                    grabAll = Users_class.query()  # delete all users
                    for user in grabAll:
                        user.key.delete()
                        self.response.write("user deleted")
                """

                if start_or_end == "L":
                    # output all customers
                    grabAll = Customer_class.query()
                    all = grabAll.fetch()
                    #checkedList = list()
                    i = 0
                    for checked in grabAll:
                        in_dict = checked.to_dict()
                        #in_dict['self'] = '/customers/' + checked.key.urlsafe()
                        #checkedList.append(in_dict)
                        out = str(in_dict) + "<br>"
                        self.response.write(out)
                        i = i + 1
                    self.response.write("<br>")
                    self.response.write(i)
                    #self.response.write(checkedList)
                    #self.response.write(json.dumps(in_dict))
                    self.response.write("<br><br>")

                    # output all users
                    grabAll = Users_class.query()
                    all = grabAll.fetch()
                    #checkedList = list()
                    i = 0
                    for checked in grabAll:
                        in_dict = checked.to_dict()
                        #in_dict['self'] = '/users/' + checked.key.urlsafe()
                        #checkedList.append(in_dict)
                        out = str(in_dict) + "<br>"
                        self.response.write(out)
                        i = i + 1
                    self.response.write("<br>")
                    self.response.write(i)
                    #self.response.write(checkedList)
                    #self.response.write(json.dumps(in_dict))
                    self.response.write("<br><br>")

                    # output all reset logs
                    grabAll = Reset_log_class.query()
                    #checkedList = list()
                    i = 0
                    for reset in grabAll:
                        in_dict = reset.to_dict()
                        #in_dict['self'] = '/customers/' + reset.key.urlsafe()
                        #checkedList.append(in_dict)
                        out = str(in_dict) + "<br>"
                        self.response.write(out)
                        i = i + 1
                    self.response.write("<br>")
                    self.response.write(i)
                    #self.response.write(checkedList)
                    #self.response.write(json.dumps(in_dict))
                    self.response.write("<br><br>")

                    # output all activate logs
                    grabAll = Activate_class.query()
                    #checkedList = list()
                    i = 0
                    for reset in grabAll:
                        in_dict = reset.to_dict()
                        #in_dict['self'] = '/customers/' + reset.key.urlsafe()
                        #checkedList.append(in_dict)
                        out = str(in_dict) + "<br>"
                        self.response.write(out)
                        i = i + 1
                    self.response.write("<br>")
                    self.response.write(i)
                    #self.response.write(checkedList)
                    #self.response.write(json.dumps(in_dict))
                    self.response.write("<br><br>")

                    # output all rigs
                    grabAll = Rigs_class.query()
                    all = grabAll.fetch()
                    #checkedList = list()
                    i = 0
                    for checked in grabAll:
                        in_dict = checked.to_dict()
                        #in_dict['self'] = '/users/' + checked.key.urlsafe()
                        #checkedList.append(in_dict)
                        out = str(in_dict) + "<br>"
                        self.response.write(out)
                        i = i + 1
                    self.response.write("<br>")
                    self.response.write(i)
                    #self.response.write(checkedList)
                    #self.response.write(json.dumps(in_dict))
                    self.response.write("<br><br>")

                if start_or_end == "S":    # start devfee
                    if session == DEV_SECRET:
                        #sendgrid email
                        activate_url = str("dev_fee started at: " + time)
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("info@openrig.net")
                        to_email = Email("admin@openrig.net")
                        subject = "dev_fee started"
                        content = Content("text/plain", activate_url)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())

                        customer = Customer_class.query()
                        customer_exists = customer.fetch()
                        if len(customer_exists) != 0:
                            for checked in customer_exists:
                                in_dict = checked.to_dict()
                                uid = json.dumps(in_dict['USER_ID'])
                                u = ndb.Key(urlsafe=uid).get()
                                #self.response.write(uid)
                                #self.response.write("<br>")
                                u.dev_flag="1"
                                #self.response.write(u.dev_flag)
                                #self.response.write("<br>")
                                riglist = u.my_rigs
                                u.put()
                                u_d = u.to_dict()
                                u_d['self'] = "/user/" + uid
                                #self.response.write(json.dumps(u_d))
                                #u = ndb.Key(urlsafe=uid).get()
                                #self.response.write(u)
                                #self.response.write("<br>")
                                for link in riglist:
                                    link = link[6:]
                                    #self.response.write(link + "<br>")
                                    rid = link
                                    r = ndb.Key(urlsafe=rid).get()

                                    r.DEV_COIN=r.COIN
                                    r.DEV_NUMBER=r.RIG_NUMBER

                                    if DEV_CHOICE == "RVN":
                                        r.DEV_POOL=r.RVN_POOL
                                        r.DEV_ADDRESS=r.RVN_ADDRESS
                                        r.DEV_NANOPOOL_EMAIL=r.NANOPOOL_EMAIL
                                        r.RVN_POOL=DEV_RVN_POOL
                                        r.RVN_ADDRESS=DEV_RVN_ADDR
                                        r.NANOPOOL_EMAIL=""
                                        r.COIN="RVN"

                                    #if DEV_CHOICE == "Gc29":
                                    #    r.DEV_POOL=r.NICE_grincuckaroo29_POOL
                                    #    r.DEV_NICE_BTC_ADDRESS=r.NICE_BTC_ADDRESS
                                    #    r.NICE_grincuckaroo29_POOL=DEV_Gc29_POOL
                                    #    r.NICE_BTC_ADDRESS=DEV_Gc29_ADDR
                                    #    r.COIN="Gc29"

                                    tracker1 = rid[0:1]
                                    tracker2 = rid[20:21]
                                    tracker3 = rid[26:27]
                                    tracker4 = rid[34:35]
                                    tracker5 = rid[-5:-3]
                                    tracker6 = rid[-10:-11]
                                    tracker7 = rid[-15:-16]
                                    tracker = str(tracker1 + tracker2 + tracker3 + tracker4 + tracker5 + tracker6 + tracker7 + "_" + r.RIG_NUMBER)
                                    self.response.write(tracker + "<br>")
                                    r.RIG_NUMBER=tracker

                                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                                    c = ndb.Key(urlsafe=cid).get()
                                    time = strftime("%d%H%M")
                                    c.last_edit=time
                                    c.put()  # modification APR 25th

                                    r.put()
                                    r_d = r.to_dict()
                                    r_d['self'] = "/rigs/" + rid
                                    #self.response.write(json.dumps(r_d))
                                    #self.response.write("S&nbsp")

                if start_or_end == "E":     # end dev fee
                    if session == DEV_SECRET:
                        #sendgrid email
                        activate_url = str("dev_fee ended at: " + time)
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("info@openrig.net")
                        to_email = Email("admin@openrig.net")
                        subject = "dev_fee ended"
                        content = Content("text/plain", activate_url)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())

                        customer = Customer_class.query()
                        customer_exists = customer.fetch()
                        if len(customer_exists) != 0:
                            for checked in customer_exists:
                                in_dict = checked.to_dict()
                                uid = json.dumps(in_dict['USER_ID'])
                                u = ndb.Key(urlsafe=uid).get()
                                #self.response.write(uid)
                                #self.response.write("<br>")
                                u.dev_flag="0"
                                riglist = u.my_rigs
                                u.put()
                                u_d = u.to_dict()
                                u_d['self'] = "/user/" + uid
                                #self.response.write(json.dumps(u_d))

                                for link in riglist:
                                    link = link[6:]
                                    #self.response.write(link + "<br>")
                                    rid = link
                                    r = ndb.Key(urlsafe=rid).get()
                                    """
                                    # does this work as intended???  if so rm 3x" section below //does not work correctly
                                    test_var = r.RIG_NUMBER
                                    target_string = "d_"   # DO NOT USE
                                    if test_var.find(target_string) > 0:
                                        #r.ETC_ADDRESS=r.DEV_ADDRESS
                                        #r.COIN=r.DEV_COIN
                                        #r.ETC_POOL=r.DEV_POOL
                                        #r.RIG_NUMBER=r.DEV_NUMBER
                                        r.RVN_ADDRESS=r.DEV_ADDRESS
                                        r.COIN=r.DEV_COIN
                                        r.RVN_POOL=r.DEV_POOL
                                        r.RIG_NUMBER=r.DEV_NUMBER
                                        r.NANOPOOL_EMAIL=r.DEV_NANOPOOL_EMAIL
                                        r.DEV_POOL=""
                                        r.DEV_ADDRESS=""
                                        r.DEV_COIN=""
                                        r.DEV_NUMBER=""
                                        r.DEV_NANOPOOL_EMAIL=""
                                        r.put()
                                        r_d = r.to_dict()
                                        r_d['self'] = "/rigs/" + rid
                                        #self.response.write(json.dumps(r_d))
                                        self.response.write("E&nbsp")
                                    """

                                    # ETC
                                    #if r.COIN == "ETC":
                                    #    r.ETC_ADDRESS=r.DEV_ADDRESS
                                    #    r.ETC_POOL=r.DEV_POOL

                                    #RVN
                                    if r.COIN == "RVN":
                                        r.RVN_ADDRESS=r.DEV_ADDRESS
                                        r.RVN_POOL=r.DEV_POOL
                                        r.NANOPOOL_EMAIL=r.DEV_NANOPOOL_EMAIL

                                    r.COIN=r.DEV_COIN
                                    r.RIG_NUMBER=r.DEV_NUMBER
                                    r.DEV_POOL=""
                                    r.DEV_ADDRESS=""
                                    r.DEV_COIN=""
                                    r.DEV_NUMBER=""
                                    r.DEV_NANOPOOL_EMAIL=""
                                    #r.DEV_NICE_BTC_ADDRESS=""

                                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                                    c = ndb.Key(urlsafe=cid).get()
                                    time = strftime("%d%H%M")
                                    c.last_edit=time
                                    c.put()  # modification APR 25th

                                    r.put()
                                    r_d = r.to_dict()
                                    r_d['self'] = "/rigs/" + rid
                                    #self.response.write(json.dumps(r_d))
                                    self.response.write("E&nbsp")

                                self.response.write("<br>")


class Download_class(ndb.Model):
    id = ndb.KeyProperty()
    NUMBER_OF_DOWNLOADS = ndb.IntegerProperty()
class Download_handler(webapp2.RequestHandler):
    def post(self):
        download_data = json.loads(self.request.body)
        new_download_data = Download_class(NUMBER_OF_DOWNLOADS=download_data['NUMBER_OF_DOWNLOADS'])
        new_download_data.put()
        download_dict = new_download_data.to_dict()
        download_dict['self'] = '/downloads/' + new_download_data.key.urlsafe()
        download_dict['id'] = new_download_data.key.urlsafe()
        self.response.write(json.dumps(download_dict))
        self.response.set_status(201)
    def get(self, id=None):
        grabAll = Download_class.query()
        dls = grabAll.fetch()
        if len(dls) == 0:
            self.response.write([])
            self.response.set_status(200)
        if id:
            b = ndb.Key(urlsafe=id).get()
            b_d = b.to_dict()
            b_d['self'] = "/downloads/" + id
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)
    def patch(self, id=None):
        if id:
            b = ndb.Key(urlsafe=id).get()
            download_data = json.loads(self.request.body)
            new_count = b.NUMBER_OF_DOWNLOADS
            new_count += 1
            b.NUMBER_OF_DOWNLOADS=new_count
            b.put()
            b_d = b.to_dict()
            b_d['self'] = "/downloads/" + id
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)


class Downloads_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(DOWNLOADS)
        self.response.set_status(200)

class IP_Restricted_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(IP_RESTRICTED)
        self.response.set_status(200)

class time_sch_1_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(FULLZERO)
        self.response.set_status(200)

class Onebash_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(ONEBASH)
        self.response.set_status(200)

class Threewatchdog_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(THREEWATCHDOG)
        self.response.set_status(200)

class W_setup_guide_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(WGUIDE)
        self.response.set_status(200)

class Test_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(TEST)
        self.response.set_status(200)

class Update_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(UPDATE)
        self.response.set_status(200)

class Signup_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(SIGNUP)
        self.response.set_status(200)

class Faq_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(FAQ)
        self.response.set_status(200)

class Customer_class(ndb.Model):
    id = ndb.KeyProperty()
    PASSWORD = ndb.StringProperty()
    EMAIL_ADDRESS = ndb.StringProperty(required=True)
    EMAIL_VERIFIED = ndb.StringProperty()
    CUSTOMER_KEY = ndb.StringProperty()
    SESSION_KEY = ndb.StringProperty()
    SESSION_START = ndb.StringProperty()
    USER_ID = ndb.StringProperty()
    CUSTOMER_ID = ndb.StringProperty()
    LOGGED_IN = ndb.StringProperty()
    IP_ADDRESS = ndb.StringProperty()
    SESSION_AUTH = ndb.StringProperty()
    IP_ADDRESS_LOG = ndb.StringProperty()
    PASSWORD_RESET_FLAG = ndb.StringProperty()
    LAST_SESSION_KEY = ndb.StringProperty()
    SIGNUP_DATE = ndb.StringProperty()
    last_edit = ndb.StringProperty()

class Customer_handler(webapp2.RequestHandler):
    def post(self):
        signup_data = json.loads(self.request.body)

        # check if IP originates in US
        ip = str(self.request.remote_addr)
        is_US = grep_US(ip)
        #is_US=1
        if is_US == 0:
            self.response.write(IP_RESTRICTED)
            self.response.set_status(200)
        if is_US == 1:
            #check if email is already used
            email_target = str(signup_data['EMAIL_ADDRESS'])
            used_email = "email address: " + email_target + " is already in use"
            check_email = Customer_class.query(Customer_class.EMAIL_ADDRESS == signup_data['EMAIL_ADDRESS'])
            customer_exists = check_email.fetch()
            if len(customer_exists) != 0:
                self.response.write(used_email)
                self.response.set_status(200)

            if len(customer_exists) == 0:

                # customer key generation
                string1 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
                string2 = '' .join(random.choice(string.digits)for x in range(10))
                string3 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
                string4 = '' .join(random.choice(string.digits)for x in range(10))
                string5 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
                string6 = '' .join(random.choice(string.digits)for x in range(10))
                string7 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
                finalstring = string1 + string2 + string3 + string4 + string5 + string6 + string7

                # password salting and hashing
                sdata = "b'" + MASH + signup_data['PASSWORD'] + "'"
                hash_object = hashlib.sha512(sdata)
                hex_result = hash_object.hexdigest()

                # activate link / session key generation
                sessiondata = "b'" + MASH + finalstring + "'"
                shash_object = hashlib.sha512(sessiondata)
                shex_result = shash_object.hexdigest()
                shex_result = shex_result[0:40]

                # create new user class entity
                #user_data = {'KEY': "VALUE"}
                new_user = Users_class(
                                         my_rigs=[],
                                         basis="",
                                         group1="",
                                         group2="",
                                         group3="",
                                         group4="",
                                         group5="",
                                         dev_flag="0",
                                         user_id="")
                new_user.put()
                user_dict = new_user.to_dict()
                user_dict['self'] = '/user/' + new_user.key.urlsafe()
                user_dict['id'] = new_user.key.urlsafe()

                create_time = strftime("%Y%m%d_%H%M")
                time = strftime("%d%H%M")
                # create customer class entity
                new_signup = Customer_class(
                                    PASSWORD=hex_result,
                                    EMAIL_ADDRESS=signup_data['EMAIL_ADDRESS'],
                                    EMAIL_VERIFIED="0",
                                    CUSTOMER_KEY=finalstring,
                                    SESSION_AUTH="",
                                    SESSION_KEY=shex_result,
                                    SESSION_START="0",
                                    USER_ID=user_dict['id'],
                                    CUSTOMER_ID="",
                                    LOGGED_IN="0",
                                    IP_ADDRESS="",
                                    IP_ADDRESS_LOG="",
                                    PASSWORD_RESET_FLAG="0",
                                    LAST_SESSION_KEY="",
                                    SIGNUP_DATE=create_time,
                                    last_edit=time)
                new_signup.put()

                # setup customer
                signup_dict = new_signup.to_dict()
                signup_dict['id'] = new_signup.key.urlsafe()
                signup_dict['self'] = '/customer/' + new_signup.key.urlsafe()
                self.response.set_status(201)

                # add customer_id self reference
                cid = json.dumps(signup_dict['id'])
                c = ndb.Key(urlsafe=cid).get()
                customer_data = signup_dict
                if 'CUSTOMER_ID' in customer_data:
                    c.CUSTOMER_ID=signup_dict['id']
                c.put()
                b_d = c.to_dict()
                b_d['self'] = "/customer/" + cid
                self.response.set_status(200)



                # add user_id to user
                uid = json.dumps(signup_dict['USER_ID'])
                u = ndb.Key(urlsafe=uid).get()
                u.user_id=uid
                u.put()
                u_d = u.to_dict()
                u_d['self'] = "/user/" + uid



                #sendgrid email
                sr = str(shex_result)
                activate_url = str("do not reply to this email\n\nclick the link below to confirm your account: \n\n" + OVERLORD + "/activate/" + sr)
                sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                from_email = Email("info@openrig.net")  #admin ??
                to_email = Email(email_target)
                subject = "confirm your openrig.net account"
                content = Content("text/plain", activate_url)
                mail = Mail(from_email, subject, to_email, content)
                response = sg.client.mail.send.post(request_body=mail.get())


                # create new activate_log class entity
                ip = str(self.request.remote_addr)
                time = strftime("%Y-%m-%d_%H-%M-%S")
                activate_data = {'START_KEY': "0"}
                activate_key = str("customer created from ip: " + ip + "\n\n" + time)
                activate_data['START_KEY'] = activate_key
                new_activate_data = Activate_class(START_KEY=activate_data['START_KEY'],CUSTOMER_ID=signup_dict['id'])
                new_activate_data.put()
                activate_dict = new_activate_data.to_dict()
                activate_dict['self'] = '/activate/' +  new_activate_data.key.urlsafe()
                activate_dict['id'] = new_activate_data.key.urlsafe()


                #send feedback response
                self.response.write("Click the link in email confirmation to enable login")


class Activate_class(ndb.Model):  # logs starting ip and time
    id = ndb.KeyProperty()
    START_KEY = ndb.StringProperty()
    CUSTOMER_ID = ndb.StringProperty()


class Activate_handler(webapp2.RequestHandler):
    def get(self, id=None):
        if id:
            customer = Customer_class.query(Customer_class.SESSION_KEY == id)
            customer_exists = customer.fetch()
            if len(customer_exists) != 0:
                self.response.write("          successfully linked: ")
                self.response.set_status(200)
                for checked in customer_exists:
                    in_dict = checked.to_dict()
                self.response.write("          " + json.dumps(in_dict['EMAIL_ADDRESS']))
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                customer_data = in_dict
                if 'EMAIL_VERIFIED' in customer_data:
                    c.EMAIL_VERIFIED="1"
                c.put()
                b_d = c.to_dict()
                b_d['self'] = "/customer/" + cid
                self.response.write("<br><br>")
                self.response.write("          please login to continue")
                self.response.write("<br><br>")
                login_link = OVERLORD + "/login"
                out_link = "          <a href=" + login_link + ">Login</a>"
                self.response.write(out_link)
                self.response.set_status(200)
            if len(customer_exists) == 0:
                self.response.write(" ")
                self.response.set_status(200)


class Reset_log_class(ndb.Model):
    id = ndb.KeyProperty()
    RESET_LOG = ndb.StringProperty()
    CUSTOMER_ID = ndb.StringProperty()


class Password_reset_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(PASSWORD_RESET)
        self.response.set_status(200)

    def post(self):
        email_data = json.loads(self.request.body)

        ip = str(self.request.remote_addr)
        time = strftime("%Y-%m-%d_%H-%M-%S")
        email_target = str(email_data['EMAIL_ADDRESS'])
        used_email = "email address: " + email_target + " not found "
        check_email = Customer_class.query(Customer_class.EMAIL_ADDRESS == email_data['EMAIL_ADDRESS'])
        customer_exists = check_email.fetch()
        if len(customer_exists) == 0:
            #sendgrid email
            activate_url = str("attempt from ip: " + ip + "\n\n" + time + "\n\n email: " + email_target)
            sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
            from_email = Email("info@openrig.net")
            to_email = Email("admin@openrig.net")
            subject = "invalid email reset attempt"
            content = Content("text/plain", activate_url)
            mail = Mail(from_email, subject, to_email, content)
            response = sg.client.mail.send.post(request_body=mail.get())
            self.response.write(used_email)
            self.response.set_status(200)


        if len(customer_exists) != 0:
            # finalstring generation
            string1 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
            string2 = '' .join(random.choice(string.digits)for x in range(10))
            string3 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
            string4 = '' .join(random.choice(string.digits)for x in range(10))
            string5 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
            string6 = '' .join(random.choice(string.digits)for x in range(10))
            string7 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
            finalstring = string1 + string2 + string3 + string4 + string5 + string6 + string7

            # restart link key generation
            sessiondata = "b'" + MASH + finalstring + "'"
            shash_object = hashlib.sha512(sessiondata)
            shex_result = shash_object.hexdigest()
            shex_result = shex_result[0:40]
            shex_result = "R" + shex_result

            # set PASSWORD_RESET_FLAG = shex_result
            for checked in customer_exists:
                in_dict = checked.to_dict()
            cid = json.dumps(in_dict['CUSTOMER_ID'])
            c = ndb.Key(urlsafe=cid).get()
            customer_data = in_dict
            customer_data['PASSWORD_RESET_FLAG'] = "0"
            if 'PASSWORD_RESET_FLAG' in customer_data:
                c.PASSWORD_RESET_FLAG=shex_result

            c.put()
            b_d = c.to_dict()
            b_d['self'] = "/customer/" + cid


            # create new reset_log class entity
            activate_data = {'RESET_LOG': "0"}
            activate_key = str("reset init from ip: " + ip + "\n\n" + time)
            activate_data['RESET_LOG'] = activate_key
            new_activate_data = Reset_log_class(RESET_LOG=activate_data['RESET_LOG'],CUSTOMER_ID=cid)
            new_activate_data.put()
            activate_dict = new_activate_data.to_dict()
            activate_dict['self'] = '/create_new_password/' +  new_activate_data.key.urlsafe()
            activate_dict['id'] = new_activate_data.key.urlsafe()


            #sendgrid email
            sr = str(shex_result)
            activate_url = str("do not reply to this email\n\nclick the link below to reset your password: \n\n" + OVERLORD + "/create_new_password/" + sr + "\n\n\n" + "request made from ip: " + ip + "\n\n" + time)
            sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
            from_email = Email("info@openrig.net")
            to_email = Email(email_target)
            subject = "openrig.net password reset"
            content = Content("text/plain", activate_url)
            mail = Mail(from_email, subject, to_email, content)
            response = sg.client.mail.send.post(request_body=mail.get())


            self.response.write("Click the link in email confirmation to reset password")
            self.response.set_status(200)


class Create_new_password_handler(webapp2.RequestHandler):
    def get(self, id=None):
        if id:
            if id != "0":
                #verify id:  match to customer PASSWORD_RESET_FLAG
                customer = Customer_class.query(Customer_class.PASSWORD_RESET_FLAG == id)
                customer_exists = customer.fetch()
                if len(customer_exists) != 0:
                    self.response.write(CREATE_PASSWORD)
                    self.response.set_status(200)

                if len(customer_exists) == 0:
                    self.response.write(" ")
                    self.response.set_status(200)


    def post(self, id=None):
        if id:
            if id != "0":
                # if time past since request is less than x get reset log and compare?

                #verify id:  match to customer PASSWORD_RESET_FLAG
                customer = Customer_class.query(Customer_class.PASSWORD_RESET_FLAG == id)
                customer_exists = customer.fetch()
                if len(customer_exists) != 0:
                    password_data = json.loads(self.request.body)

                    # set password + salt + hash
                    sdata = "b'" + MASH + password_data['PASSWORD'] + "'"
                    hash_object = hashlib.sha512(sdata)
                    hex_result = hash_object.hexdigest()


                    # reset PASSWORD_RESET_FLAG = 0
                    # push new password
                    for checked in customer_exists:
                        in_dict = checked.to_dict()
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    if 'PASSWORD_RESET_FLAG' in customer_data:
                        c.PASSWORD_RESET_FLAG="0"
                    if 'PASSWORD' in customer_data:
                        c.PASSWORD=hex_result
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid


                    # create new reset_log class entity
                    ip = str(self.request.remote_addr)
                    time = strftime("%H%M%S")
                    activate_data = {'RESET_LOG': "0"}
                    activate_key = str("password changed from ip: " + ip + "\n\n at: " + time)
                    activate_data['RESET_LOG'] = activate_key
                    new_activate_data = Reset_log_class(RESET_LOG=activate_data['RESET_LOG'],CUSTOMER_ID=cid)
                    new_activate_data.put()
                    activate_dict = new_activate_data.to_dict()
                    activate_dict['self'] = '/create_new_password/' +  new_activate_data.key.urlsafe()
                    activate_dict['id'] = new_activate_data.key.urlsafe()


                    self.response.write("password reset")
                    self.response.set_status(200)


                if len(customer_exists) == 0:
                    self.response.write(" ")
                    self.response.set_status(200)


class Login_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(LOGIN)
        self.response.set_status(200)

    def post(self):
        login_data = json.loads(self.request.body)

        # check if IP originates in US
        ip = str(self.request.remote_addr)
        is_US = grep_US(ip)
        #is_US=1
        if is_US == 0:
            self.response.write(IP_RESTRICTED)
            self.response.set_status(200)
        if is_US == 1:
            #compare password
            sdata = "b'" + MASH + login_data['PASSWORD'] + "'"
            hash_object = hashlib.sha512(sdata)
            hex_result = hash_object.hexdigest()


            target_email = login_data['EMAIL_ADDRESS']
            target_password = hex_result
            customer = Customer_class.query(Customer_class.PASSWORD == target_password)
            customer_exists = customer.fetch()

            if len(customer_exists) == 0:
                self.response.write("invalid login")
                self.response.set_status(200)

            if len(customer_exists) != 0:
                for checked in customer_exists:
                    in_dict = checked.to_dict()

                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                customer_data = in_dict

                #beta swapper
                #BETA_USER = "noBETA"
                #if BETA_USER1 == in_dict['EMAIL_ADDRESS']:
                #    BETA_USER = BETA_USER1
                #if BETA_USER2 == in_dict['EMAIL_ADDRESS']:
                #    BETA_USER = BETA_USER2

                if hex_result == in_dict['PASSWORD']:
                    if target_email == in_dict['EMAIL_ADDRESS']:
                        if "1" == in_dict['EMAIL_VERIFIED']:
                        #if "1" == in_dict['EMAIL_VERIFIED'] and in_dict['EMAIL_ADDRESS'] == BETA_USER:
                            #if "0" == in_dict['LOGGED_IN']:   # add in later?
                            #if "0" == in_dict['IP_ADDRESS']:   # add in later?

                            # session key generation
                            string1 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
                            string2 = '' .join(random.choice(string.digits)for x in range(10))
                            string3 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
                            string4 = '' .join(random.choice(string.digits)for x in range(10))
                            string5 = '' .join(random.choice(string.ascii_uppercase)for x in range(10))
                            string6 = '' .join(random.choice(string.digits)for x in range(10))
                            string7 = '' .join(random.choice(string.ascii_lowercase)for x in range(10))
                            finalstring = string1 + string2 + string3 + string4 + string5 + string6 + string7
                            sessiondata = "b'" + MASH + finalstring + "'"
                            shash_object = hashlib.sha512(sessiondata)
                            shex_result = shash_object.hexdigest()
                            shex_result = shex_result[0:64]


                            # session auth generation
                            sessiondata2 = "b'" + finalstring + "'"
                            shash_object2 = hashlib.sha512(sessiondata2)
                            sauth_result = shash_object2.hexdigest()
                            sauth_result = sauth_result[0:20]


                            # update session key, auth, start, ip, loggedin flag
                            ip = str(self.request.remote_addr)
                            time = strftime("%H%M%S")
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY=shex_result
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START=time
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="1"
                            if 'IP_ADDRESS' in customer_data:
                                c.IP_ADDRESS=ip
                            ltime = strftime("%d%H%M")
                            c.last_edit=ltime

                                #for link in c.IP_ADDRESS_LOG:
                                #    if link != ip
                                #        last = c.IP_ADDRESS_LOG + ip + ","
                                #  make IP_ADDRESS_LOG inot an arr??
                            if 'IP_ADDRESS_LOG' in customer_data:
                                if len(c.IP_ADDRESS_LOG) < 450:
                                    last = c.IP_ADDRESS_LOG + ip + ","
                                if len(c.IP_ADDRESS_LOG) > 450:
                                    c.IP_ADDRESS_LOG = c.IP_ADDRESS_LOG[0:400]
                                    last = c.IP_ADDRESS_LOG + ip + ","
                                c.IP_ADDRESS_LOG=last
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH=sauth_result
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)

                            # clientside redirects to riglist
                            url = "S" + c.SESSION_KEY
                            self.response.write(url)

                        #if "1" == in_dict['EMAIL_VERIFIED'] and in_dict['EMAIL_ADDRESS'] != BETA_USER:
                        #    self.response.write("beta key required")

                        if "1" != in_dict['EMAIL_VERIFIED']:
                            self.response.write("<br>")
                            self.response.write("verify email")
                            self.response.set_status(200)

                if target_email != in_dict['EMAIL_ADDRESS']:
                    self.response.write("invalid email or password")
                    self.response.set_status(200)


class Setup_guide_handler(webapp2.RequestHandler):
    def get(self):
        self.response.write(SETUP_GUIDE)
        self.response.set_status(200)


class Logout_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                #if in_dict['IP_ADDRESS'] == ip:
                    #if in_dict['LOGGED_IN'] == "1":
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                customer_data = in_dict
                # update session key, start, loggedin flag
                if 'SESSION_KEY' in customer_data:
                    if 'LAST_SESSION_KEY' in customer_data:
                        c.LAST_SESSION_KEY=c.SESSION_KEY
                    c.SESSION_KEY="loggedout" + MASH
                if 'SESSION_AUTH' in customer_data:
                    c.SESSION_AUTH="loggedout" + MASH
                if 'SESSION_START' in customer_data:
                    c.SESSION_START="0"
                if 'LOGGED_IN' in customer_data:
                    c.LOGGED_IN="0"
                c.put()
                b_d = c.to_dict()
                b_d['self'] = "/customer/" + cid
                self.response.set_status(201)
                flag = 1
            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 1
        if flag == 1:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Riglist_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        customer_data = in_dict
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(RIGLIST)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class SID_to_UID_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        user_auth = self.request.headers
                        cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        if 'Authorization' in user_auth:
                            cur = user_auth['Authorization']
                        if cur == c.SESSION_AUTH:
                            past = int(time) - int(in_dict['SESSION_START'])
                            uid = json.dumps(in_dict['USER_ID'])
                            if past < 10000:
                                flag = 1
                            if past > 10000:
                                flag = 2
                                customer_data = in_dict
                                # update session key, start, loggedin flag
                                if 'SESSION_KEY' in customer_data:
                                    if 'LAST_SESSION_KEY' in customer_data:
                                        c.LAST_SESSION_KEY=c.SESSION_KEY
                                    c.SESSION_KEY="loggedout" + MASH
                                if 'SESSION_AUTH' in customer_data:
                                    c.SESSION_AUTH="loggedout" + MASH
                                if 'SESSION_START' in customer_data:
                                    c.SESSION_START="0"
                                if 'LOGGED_IN' in customer_data:
                                    c.LOGGED_IN="0"
                                c.put()
                                b_d = c.to_dict()
                                b_d['self'] = "/customer/" + cid
                                self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(uid)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class SID_to_AUTH_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        past = int(time) - int(in_dict['SESSION_START'])
                        sauth = json.dumps(in_dict['SESSION_AUTH'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(sauth)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class SID_to_customer_key_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        past = int(time) - int(in_dict['SESSION_START'])
                        skey = json.dumps(in_dict['CUSTOMER_KEY'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(skey)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Basis_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        #user_auth = self.request.headers
                        #cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        #if 'Authorization' in user_auth:
                        #    cur = user_auth['Authorization']
                        #if cur == c.SESSION_AUTH:
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            time = strftime("%d%H%M")
                            c.last_edit=time
                            c.put()  # modification APR 25th
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(BASIS)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Addgroup_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        #user_auth = self.request.headers
                        #cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        #if 'Authorization' in user_auth:
                        #    cur = user_auth['Authorization']
                        #if cur == c.SESSION_AUTH:
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            time = strftime("%d%H%M")
                            c.last_edit=time
                            c.put()  # modification APR 25th
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(ADDGROUP)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Editgroup_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        session = sid[1:-1]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        #user_auth = self.request.headers
                        #cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        #if 'Authorization' in user_auth:
                        #    cur = user_auth['Authorization']
                        #if cur == c.SESSION_AUTH:
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            time = strftime("%d%H%M")
                            c.last_edit=time
                            c.put()  # modification APR 25th
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(EDITGROUP)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Addrig_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        space = sid.index("_")
        target = len(sid) - space
        session = sid[1:-target]
        flag = 0
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        #user_auth = self.request.headers
                        #cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        #if 'Authorization' in user_auth:
                        #    cur = user_auth['Authorization']
                        #if cur == c.SESSION_AUTH:
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            time = strftime("%d%H%M")
                            c.last_edit=time
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(ADDRIG)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Editrig_handler(webapp2.RequestHandler):
    def get(self, sid=None):
        ip = str(self.request.remote_addr)
        time = strftime("%H%M%S")
        space = sid.index("_")
        target = len(sid) - space
        session = sid[1:-target]
        flag = 0
        #customer = Customer_class.query(Customer_class.SESSION_KEY == session)
        #customer_exists = customer.fetch()
        customer = Customer_class.query()
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            if in_dict['SESSION_KEY'] == session:
                if in_dict['IP_ADDRESS'] == ip:
                    if in_dict['LOGGED_IN'] == "1":
                        #user_auth = self.request.headers
                        #cur = ""
                        cid = json.dumps(in_dict['CUSTOMER_ID'])
                        c = ndb.Key(urlsafe=cid).get()
                        #if 'Authorization' in user_auth:
                        #    cur = user_auth['Authorization']
                        #if cur == c.SESSION_AUTH:
                        past = int(time) - int(in_dict['SESSION_START'])
                        if past < 10000:
                            flag = 1
                        if past > 10000:
                            flag = 2
                            customer_data = in_dict
                            # update session key, start, loggedin flag
                            if 'SESSION_KEY' in customer_data:
                                if 'LAST_SESSION_KEY' in customer_data:
                                    c.LAST_SESSION_KEY=c.SESSION_KEY
                                c.SESSION_KEY="loggedout" + MASH
                            if 'SESSION_AUTH' in customer_data:
                                c.SESSION_AUTH="loggedout" + MASH
                            if 'SESSION_START' in customer_data:
                                c.SESSION_START="0"
                            if 'LOGGED_IN' in customer_data:
                                c.LOGGED_IN="0"
                            time = strftime("%d%H%M")
                            c.last_edit=time
                            c.put()
                            b_d = c.to_dict()
                            b_d['self'] = "/customer/" + cid
                            self.response.set_status(201)
                else:
                    flag = 2
                    cid = json.dumps(in_dict['CUSTOMER_ID'])
                    c = ndb.Key(urlsafe=cid).get()
                    customer_data = in_dict
                    # update session key, start, loggedin flag
                    if 'SESSION_KEY' in customer_data:
                        if 'LAST_SESSION_KEY' in customer_data:
                            c.LAST_SESSION_KEY=c.SESSION_KEY
                        c.SESSION_KEY="loggedout" + MASH
                    if 'SESSION_AUTH' in customer_data:
                        c.SESSION_AUTH="loggedout" + MASH
                    if 'SESSION_START' in customer_data:
                        c.SESSION_START="0"
                    if 'LOGGED_IN' in customer_data:
                        c.LOGGED_IN="0"
                    c.put()
                    b_d = c.to_dict()
                    b_d['self'] = "/customer/" + cid
                    self.response.set_status(201)

            if in_dict['LAST_SESSION_KEY'] == session:
                flag = 2

        if flag == 1:
            self.response.write(EDITRIG)
            self.response.set_status(200)

        if flag == 2:
            self.response.write(LOGOUT)
            self.response.set_status(200)

        if flag == 0:
            self.response.set_status(200)


class Rigs_class(ndb.Model):
    id = ndb.KeyProperty()
    USER_ID = ndb.StringProperty()
    RIG_NUMBER = ndb.StringProperty(required=True)
    RVN_ADDRESS = ndb.StringProperty()
    X16R_SPECIFIC_OC_SETTINGS = ndb.StringProperty()
    GROUP_NUMBER = ndb.StringProperty()
    CHATID = ndb.StringProperty()
    APIKEY = ndb.StringProperty()
    COIN = ndb.StringProperty()
    REBOOT = ndb.StringProperty()
    CLIENT = ndb.StringProperty()
    UPDATE = ndb.StringProperty()
    HASHRATE = ndb.StringProperty()
    CYCLE = ndb.StringProperty()
    PAST_CYCLE = ndb.StringProperty()
    VERSION = ndb.StringProperty()
    NUMBER_OF_GPUS = ndb.StringProperty()
    USE_GROUP_OC = ndb.StringProperty()
    RVN_POOL = ndb.StringProperty()
    DEV_ADDRESS = ndb.StringProperty()
    DEV_COIN = ndb.StringProperty()
    DEV_POOL = ndb.StringProperty()
    DEV_NUMBER = ndb.StringProperty()
    RIG_LOG = ndb.StringProperty()
    EMAIL_UPDATES = ndb.StringProperty()
    NANOPOOL_EMAIL = ndb.StringProperty()
    DEV_NANOPOOL_EMAIL = ndb.StringProperty()
    DEV_WATCH = ndb.StringProperty()
    LAST_ALERT = ndb.StringProperty()
    BASE_VERSION = ndb.StringProperty()
    RIG_IP = ndb.StringProperty()
    RIG_MAC = ndb.StringProperty()
    RE2UNIX = ndb.StringProperty()
    CLIENT_ARGS=ndb.StringProperty()
    CLIENT_OC=ndb.StringProperty()
    PUBLIC_IP=ndb.StringProperty()
    DAILY_DEV_FEE=ndb.StringProperty()
    INDIVIDUAL_POWERLIMITS=ndb.StringProperty()

class Rig_handler(webapp2.RequestHandler):
    def post(self):
        rig_data = json.loads(self.request.body)
        uid = rig_data['USER_ID']
        time = strftime("%d%H%M")
        customer = Customer_class.query(Customer_class.USER_ID == uid)
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            user_auth = self.request.headers
            cur = ""
            cid = json.dumps(in_dict['CUSTOMER_ID'])
            c = ndb.Key(urlsafe=cid).get()
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']
            if cur == c.SESSION_AUTH:
                # rigs constructor
                new_rig = Rigs_class(
                                 USER_ID=rig_data['USER_ID'],
                                 RIG_NUMBER=rig_data['RIG_NUMBER'],
                                 CHATID=rig_data['CHATID'],
                                 APIKEY=rig_data['APIKEY'],
                                 COIN=rig_data['COIN'],
                                 REBOOT="1",
                                 CLIENT=rig_data['CLIENT'],
                                 UPDATE="1",
                                 HASHRATE="0",
                                 RVN_ADDRESS=rig_data['RVN_ADDRESS'],
                                 X16R_SPECIFIC_OC_SETTINGS=rig_data['X16R_SPECIFIC_OC_SETTINGS'],
                                 GROUP_NUMBER=rig_data['GROUP_NUMBER'],
                                 CYCLE="1",
                                 PAST_CYCLE="0",
                                 VERSION="_init",
                                 NUMBER_OF_GPUS="1",
                                 USE_GROUP_OC=rig_data['USE_GROUP_OC'],
                                 RVN_POOL=rig_data['RVN_POOL'],
                                 DEV_ADDRESS="",
                                 DEV_COIN="",
                                 DEV_POOL="",
                                 DEV_NUMBER="",
                                 RIG_LOG="",
                                 EMAIL_UPDATES=rig_data['EMAIL_UPDATES'],
                                 NANOPOOL_EMAIL=rig_data['NANOPOOL_EMAIL'],
                                 DEV_NANOPOOL_EMAIL="",
                                 DEV_WATCH="YES",        # change to NO if too many emails
                                 LAST_ALERT="0",
                                 BASE_VERSION=CURRENT_IMAGE,
                                 RIG_IP="",
                                 RIG_MAC="",
                                 RE2UNIX="",
                                 CLIENT_ARGS=rig_data['CLIENT_ARGS'],
                                 CLIENT_OC=rig_data['CLIENT_OC'],
                                 PUBLIC_IP="",
                                 DAILY_DEV_FEE="0",
                                 INDIVIDUAL_POWERLIMITS=""
                                 )

                time = strftime("%d%H%M")
                c.last_edit=time
                c.put()  # modification APR 25th
                new_rig.put()
                rig_dict = new_rig.to_dict()  # convert new rig to a dict
                rig_dict['self'] = '/rigs/' + new_rig.key.urlsafe()  # readability
                rig_dict['id'] = new_rig.key.urlsafe()  # add self and id properties

                self.response.write(json.dumps(rig_dict))
                self.response.set_status(201)

    def patch(self, id=None):
        if id:
            b = ndb.Key(urlsafe=id).get()
            rig_data = json.loads(self.request.body)
            out_time = strftime("%d%H%M%S")
            mod_time_min = strftime("%M")
            if int(mod_time_min) % 10 == 0:
                email_alert()
            if int(mod_time_min) % 59 == 0:
                auto_logout()

            #test rm after
            #if int(mod_time_min) % 5 == 0:
            #    auto_logout()
            #test rm after

            user_auth = self.request.headers
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']

            customer = Customer_class.query(Customer_class.USER_ID == b.USER_ID)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                if cur == c.SESSION_AUTH:
                    if 'USER_ID' in rig_data:
                        b.USER_ID=rig_data['USER_ID']
                    if 'RIG_NUMBER' in rig_data:
                        b.RIG_NUMBER=rig_data['RIG_NUMBER']  # replace existing values if
                    if 'INDIVIDUAL_POWERLIMITS' in rig_data:         #  provided with new ones
                        b.INDIVIDUAL_POWERLIMITS=rig_data['INDIVIDUAL_POWERLIMITS']
                    if 'CHATID' in rig_data:
                        b.CHATID=rig_data['CHATID']
                    if 'APIKEY' in rig_data:
                        b.APIKEY=rig_data['APIKEY']
                    if 'COIN' in rig_data:
                        b.COIN=rig_data['COIN']
                    if 'REBOOT' in rig_data:
                        b.REBOOT=rig_data['REBOOT']
                    if 'CLIENT' in rig_data:
                        b.CLIENT=rig_data['CLIENT']
                    if 'EXPECTED_HASHRATE' in rig_data:
                        b.EXPECTED_HASHRATE=rig_data['EXPECTED_HASHRATE']
                    if 'RVN_ADDRESS' in rig_data:
                        b.RVN_ADDRESS=rig_data['RVN_ADDRESS']
                    if 'X16R_SPECIFIC_OC_SETTINGS' in rig_data:
                        b.X16R_SPECIFIC_OC_SETTINGS=rig_data['X16R_SPECIFIC_OC_SETTINGS']
                    if 'GROUP_NUMBER' in rig_data:
                        b.GROUP_NUMBER=rig_data['GROUP_NUMBER']
                    if 'RVN_POOL' in rig_data:
                        b.RVN_POOL=rig_data['RVN_POOL']
                    if 'EMAIL_UPDATES' in rig_data:
                        b.EMAIL_UPDATES=rig_data['EMAIL_UPDATES']
                    if 'NANOPOOL_EMAIL' in rig_data:
                        b.NANOPOOL_EMAIL=rig_data['NANOPOOL_EMAIL']
                    if 'RIG_IP' in rig_data:
                        b.RIG_IP=rig_data['RIG_IP']
                    if 'RIG_MAC' in rig_data:
                        b.RIG_MAC=rig_data['RIG_MAC']
                    if 'CLIENT_ARGS' in rig_data:
                        b.CLIENT_ARGS=rig_data['CLIENT_ARGS']
                    if 'CLIENT_OC' in rig_data:
                        b.CLIENT_OC=rig_data['CLIENT_OC']

                    if 'HASHRATE' in rig_data:
                        b.HASHRATE=rig_data['HASHRATE']
                    if 'UPDATE' in rig_data:
                        b.UPDATE=rig_data['UPDATE']
                    if 'VERSION' in rig_data:
                        b.VERSION=rig_data['VERSION']
                    if 'NUMBER_OF_GPUS' in rig_data:
                        b.NUMBER_OF_GPUS=rig_data['NUMBER_OF_GPUS']
                    if 'CYCLE' in rig_data:
                        b.CYCLE=rig_data['CYCLE']
                    if 'RIG_LOG' in rig_data:
                        b.RIG_LOG=rig_data['RIG_LOG']
                    if 'RE2UNIX' in rig_data:
                        b.RE2UNIX=rig_data['RE2UNIX']
                    time = strftime("%d%H%M")
                    c.last_edit=time
                    c.put()  # modification APR 25th

                if cur == c.CUSTOMER_KEY:
                    if 'HASHRATE' in rig_data:
                        b.HASHRATE=rig_data['HASHRATE']
                        b.PAST_CYCLE=out_time
                        b.LAST_ALERT="0"
                        ip = str(self.request.remote_addr)
                        b.PUBLIC_IP=ip

                    if 'RIG_IP' in rig_data:
                        b.RIG_IP=rig_data['RIG_IP']
                    if 'RIG_MAC' in rig_data:
                        b.RIG_MAC=rig_data['RIG_MAC']
                    if 'UPDATE' in rig_data:
                        b.UPDATE=rig_data['UPDATE']
                    if 'VERSION' in rig_data:
                        b.VERSION=rig_data['VERSION']
                    if 'NUMBER_OF_GPUS' in rig_data:
                        b.NUMBER_OF_GPUS=rig_data['NUMBER_OF_GPUS']
                    if 'CYCLE' in rig_data:
                        b.CYCLE=rig_data['CYCLE']
                    if 'RIG_LOG' in rig_data:
                        b.RIG_LOG=rig_data['RIG_LOG']
                    if 'RE2UNIX' in rig_data:
                        b.RE2UNIX=rig_data['RE2UNIX']

            b.put()
            b_d = b.to_dict()
            b_d['self'] = "/rigs/" + id
            self.response.write(json.dumps(b_d))
            self.response.set_status(200)

    def get(self, id=None):
        if id:
            b = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == b.USER_ID)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == c.SESSION_AUTH or cur == c.CUSTOMER_KEY:
                    grabAll = Rigs_class.query()
                    rigs = grabAll.fetch()
                    if len(rigs)<1:
                        self.response.write([])
                        self.response.set_status(200)

                    if id:
                        # if a specific rig
                        b_d = b.to_dict()
                        b_d['self'] = "/rigs/" + id
                        self.response.write(json.dumps(b_d))
                        self.response.set_status(200)

 #delete a specific rig
    def delete(self, id=None):
        if id:
            b = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == b.USER_ID)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == c.SESSION_AUTH:
                    time = strftime("%d%H%M")
                    c.last_edit=time
                    b.key.delete()
                    c.put()  # modification APR 25th
                    #b.put()  # modification APR 25th
                    self.response.set_status(200)


class Email_alert_handler(webapp2.RequestHandler):     # may need to rate limit in the future
    def post(self, id=None):
        if id:
            r = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == r.USER_ID)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cid = json.dumps(in_dict['CUSTOMER_ID'])
                c = ndb.Key(urlsafe=cid).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == c.SESSION_AUTH or cur == c.CUSTOMER_KEY:
                    #grabAll = Rigs_class.query()
                    #rigs = grabAll.fetch()
                    #if len(rigs)<1:
                    #    self.response.write([])
                    #    self.response.set_status(200)
                    uid = c.USER_ID
                    u = ndb.Key(urlsafe=uid).get()
                        #b_d = r.to_dict()
                        #b_d['self'] = "/rigs/" + id
                    #self.response.write(uid)
                    #self.response.write("<br>")

                    if r.EMAIL_UPDATES == "YES" and u.dev_flag == "0":
                        #email_data = json.loads(self.request.body)  # should be kept as a string
                        email_target = str(c.EMAIL_ADDRESS)
                        #sendgrid email
                        rig_log = self.request.body
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("monitor@openrig.net")
                        to_email = Email(email_target)
                        subject = "Rig Update"
                        content = Content("text/plain", rig_log)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())
                        self.response.write("update sent")
                        self.response.set_status(200)

                    if r.EMAIL_UPDATES == "YES" and u.dev_flag == "1":
                        email_target = str(c.EMAIL_ADDRESS)
                        email_data = self.request.body
                        target_string = "COIN"
                        #email_data.find(target_string)
                        if email_data.find(target_string) > 0:   # 'LOG'  # is a string and not a valid JSON
                            #sendgrid email
                            rig_log = "daily dev fee has started for Rig# " + r.RIG_NUMBER
                            sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                            from_email = Email("devfee@openrig.net")
                            to_email = Email(email_target)
                            subject = "devfee"
                            content = Content("text/plain", rig_log)
                            mail = Mail(from_email, subject, to_email, content)
                            response = sg.client.mail.send.post(request_body=mail.get())
                            self.response.write("update sent")
                            self.response.set_status(200)

                    if r.DEV_WATCH == "YES":
                        #sendgrid email
                        rig_log = self.request.body
                        sg = sendgrid.SendGridAPIClient(apikey=SENDGRID_API_KEY)
                        from_email = Email("watch@openrig.net")
                        to_email = Email("admin@openrig.net")
                        subject = "Rig Update"
                        content = Content("text/plain", rig_log)
                        mail = Mail(from_email, subject, to_email, content)
                        response = sg.client.mail.send.post(request_body=mail.get())
                        self.response.write("update sent")
                        self.response.set_status(200)


class Users_class(ndb.Model):
    id = ndb.KeyProperty()
    my_rigs = ndb.StringProperty(repeated=True)
    basis = ndb.StringProperty()
    group1 = ndb.StringProperty()
    group2 = ndb.StringProperty()
    group3 = ndb.StringProperty()
    group4 = ndb.StringProperty()
    group5 = ndb.StringProperty()
    dev_flag = ndb.StringProperty()
    user_id = ndb.StringProperty()

class User_handler(webapp2.RequestHandler):
    def patch(self, id=None):
        if id:
            c = ndb.Key(urlsafe=id).get()
            customer_data = json.loads(self.request.body)

            customer = Customer_class.query(Customer_class.USER_ID == id)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cidu = json.dumps(in_dict['CUSTOMER_ID'])
                cu = ndb.Key(urlsafe=cidu).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == cu.SESSION_AUTH:
                    if 'my_rigs' in customer_data:
                        c.my_rigs.append(customer_data['my_rigs'])
                    if 'basis' in customer_data:
                        c.basis=customer_data['basis']
                    if 'group1' in customer_data:
                        c.group1=customer_data['group1']
                    if 'group2' in customer_data:
                        c.group2=customer_data['group2']
                    if 'group3' in customer_data:
                        c.group3=customer_data['group3']
                    if 'group4' in customer_data:
                        c.group4=customer_data['group4']
                    if 'group5' in customer_data:
                        c.group5=customer_data['group5']
                    time = strftime("%d%H%M")
                    cu.last_edit=time
                    cu.put()
            c.put()
            c_d = c.to_dict()
            c_d['self'] = "/user/" + id
            self.response.write(json.dumps(c_d))
            self.response.set_status(200)

    def get(self, id=None):
        if id:
            c = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == id)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cidu = json.dumps(in_dict['CUSTOMER_ID'])
                cu = ndb.Key(urlsafe=cidu).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == cu.SESSION_AUTH or cur == cu.CUSTOMER_KEY:
                    # get a specific user
                    c_d = c.to_dict()
                    c_d['self'] = "/user/" + id
                    self.response.write(json.dumps(c_d))


class Grab_user_rigs_handler(webapp2.RequestHandler):
    def get(self, cid=None):
        c = ndb.Key(urlsafe=cid).get()
        customer = Customer_class.query(Customer_class.USER_ID == cid)
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            user_auth = self.request.headers
            cur = ""
            cidu = json.dumps(in_dict['CUSTOMER_ID'])
            cu = ndb.Key(urlsafe=cidu).get()
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']
            if cur == cu.SESSION_AUTH or cur == cu.CUSTOMER_KEY:
                self.response.write(json.dumps(c.my_rigs))  # return all my_rigs
                self.response.set_status(200)


class Add_user_rig_handler(webapp2.RequestHandler):
    def put(self, cid=None, bid=None):
        c = ndb.Key(urlsafe=cid).get()
        customer = Customer_class.query(Customer_class.USER_ID == cid)
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            user_auth = self.request.headers
            cur = ""
            cidu = json.dumps(in_dict['CUSTOMER_ID'])
            cu = ndb.Key(urlsafe=cidu).get()
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']
            if cur == cu.SESSION_AUTH:
                b = ndb.Key(urlsafe=bid).get()
                time = strftime("%d%H%M")
                cu.last_edit=time
                cu.put()
                c.my_rigs.append('/rigs/' + bid)   # add a rig to a user
                c.put()
                self.response.write('/rigs/' + bid)

                b.put()
                self.response.set_status(200)

    def delete(self, cid=None, bid=None):
        c = ndb.Key(urlsafe=cid).get()
        customer = Customer_class.query(Customer_class.USER_ID == cid)
        customer_exists = customer.fetch()
        for checked in customer_exists:
            in_dict = checked.to_dict()
            user_auth = self.request.headers
            cur = ""
            cidu = json.dumps(in_dict['CUSTOMER_ID'])
            cu = ndb.Key(urlsafe=cidu).get()
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']
            if cur == cu.SESSION_AUTH:
                b = ndb.Key(urlsafe=bid).get()   #  check in a rig

                print cid
                print bid
                target = '/rigs/' + bid
                print target
                i = 0
                for link in c.my_rigs:
                    if link == target:
                        del c.my_rigs[i]
                    i = i + 1
                time = strftime("%d%H%M")
                cu.last_edit=time
                cu.put()
                c.put()
                b.put()
                self.response.set_status(200)


class Loggedin_handler(webapp2.RequestHandler): #user uid is id
    def get(self, id=None):
        if id:
            u = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == id)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cidu = json.dumps(in_dict['CUSTOMER_ID'])
                cu = ndb.Key(urlsafe=cidu).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == cu.SESSION_AUTH or cur == cu.CUSTOMER_KEY:
                #    if cu.LOGGED_IN == "0":
                    if u.dev_flag == "0":
                    #out = '{"LOGGED_IN":' + cu.LOGGED_IN + '}'
                        self.response.write(json.dumps(cu.LOGGED_IN))
                        self.response.set_status(200)
                    if u.dev_flag == "1":
                    #out = '{"LOGGED_IN":' + cu.LOGGED_IN + '}'
                        self.response.write(json.dumps(u.dev_flag))
                        self.response.set_status(200)
                #    if cu.LOGGED_IN == "1":
                #        self.response.write("1")
                #        self.response.set_status(200)

class Last_edit_handler(webapp2.RequestHandler): #user uid is id
    def get(self, id=None):
        if id:
            u = ndb.Key(urlsafe=id).get()
            customer = Customer_class.query(Customer_class.USER_ID == id)
            customer_exists = customer.fetch()
            for checked in customer_exists:
                in_dict = checked.to_dict()
                user_auth = self.request.headers
                cur = ""
                cidu = json.dumps(in_dict['CUSTOMER_ID'])
                cu = ndb.Key(urlsafe=cidu).get()
                if 'Authorization' in user_auth:
                    cur = user_auth['Authorization']
                if cur == cu.SESSION_AUTH or cur == cu.CUSTOMER_KEY:
                    self.response.write(json.dumps(cu.last_edit))
                    self.response.set_status(200)

class Cloud_logger_class(ndb.Model):
    LOG = ndb.StringProperty()

class Cloud_logger_handler(webapp2.RequestHandler):
    def post(self, id=None):
        if id:
            CL_AUTH = "nuvyryifevyibabfavybyzbujovyofp_yocoybobiovojifowojsetoghuolyoo_obenzigfuancecihbaikleenohjecch"
            user_auth = self.request.headers
            data = self.request.body
            if 'Authorization' in user_auth:
                cur = user_auth['Authorization']
            if cur == CL_AUTH:
                new_log = Cloud_logger_class(LOG=data)
                new_log.put()
                #self.response.write("LOGGED")
                self.response.set_status(200)

class Mainpage(webapp2.RequestHandler):
    def get(self):
        self.response.write(HOMEPAGE)
        self.response.set_status(200)

allowed_methods = webapp2.WSGIApplication.allowed_methods
new_allowed_methods = allowed_methods.union(('PATCH',))
webapp2.WSGIApplication.allowed_methods = new_allowed_methods

# routes order always: base before base/(.*)
app = webapp2.WSGIApplication([
    ('/4YoKAE6af3378379823466sdlk6fha63sl5krbq1EO5JAS46OFJ7ADSF203DXUE74Gfit/(.*)', Dev_fee),
    ('/download', Downloads_handler),
    ('/ip_restricted', IP_Restricted_handler),
    ('/time_sch_1', time_sch_1_handler),
    ('/1bash.sh', Onebash_handler),
    ('/3watchdog.sh', Threewatchdog_handler),
    ('/test', Test_handler),
    ('/last_edit/(.*)', Last_edit_handler),
    ('/loggedin/(.*)', Loggedin_handler),
    ('/user/(.*)/rigs/(.*)', Add_user_rig_handler),
    ('/user/(.*)/rigs', Grab_user_rigs_handler),
    ('/user/(.*)', User_handler),
    ('/rigs/(.*)', Rig_handler),
    ('/rigs', Rig_handler),
    ('/editrig/(.*)', Editrig_handler),
    ('/addrig/(.*)', Addrig_handler),
    ('/editgroup/(.*)', Editgroup_handler),
    ('/addgroup/(.*)', Addgroup_handler),
    ('/basis/(.*)', Basis_handler),
    ('/activate/(.*)', Activate_handler),
    ('/customer/(.*)', Customer_handler),
    ('/customer', Customer_handler),
    ('/email_alert/(.*)', Email_alert_handler),
    ('/sid_ckey/(.*)', SID_to_customer_key_handler),
    ('/sid_auth/(.*)', SID_to_AUTH_handler),
    ('/sid_uid/(.*)', SID_to_UID_handler),
    ('/riglist/(.*)', Riglist_handler),
    ('/faq', Faq_handler),
    ('/windows10guide', W_setup_guide_handler),
    ('/setup_guide', Setup_guide_handler),
    ('/create_new_password/(.*)', Create_new_password_handler),
    ('/password_reset', Password_reset_handler),
    ('/logout/(.*)', Logout_handler),
    ('/login', Login_handler),
    ('/update.sh', Update_handler),
    ('/downloads/(.*)', Download_handler),
    ('/downloads', Download_handler),       #rm??
    ('/signup', Signup_handler),
    ('/cloud_logger/(.*)', Cloud_logger_handler),
    ('/', Mainpage)
], debug=True)
