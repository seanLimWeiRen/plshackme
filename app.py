from flask import Flask, render_template, request, url_for, redirect
import flask_login, json, pprint
# DEBUG COMMIT, IGNORE PLS

app = Flask(__name__)
app.secret_key = 'sdjvvllsdaiodoasdhuiADIUDHius283907329487987@%$%'
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

#challs loader
challstxt = open("challenges.json","r",encoding="utf-8")
challsjson = ''.join(challstxt.readlines())
challstxt.close()
challs = json.loads(challsjson)

pwn = challs['PWN']

for pwnchall in pwn:
    pprint.pprint(pwnchall['name'])

#best db
users = {'foo@bar.tld': {'password': 'secret'}}

#flask_login
class User(flask_login.UserMixin):
    pass


@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email
    return user

#app routes
@app.route('/')
def index():
   return render_template("index.html")

@app.route('/login',methods = ['POST', 'GET'])
def result():
    if request.method == 'POST':
        email = request.form['email']
        if email in users and request.form['password'] == users[email]['password']:
            user = User()
            user.id = email
            flask_login.login_user(user)
            return redirect(url_for('challs'))

        return 'Bad login'

    else:
       return render_template("login.html")


@app.route('/register')
def register():
   return render_template("register.html")

@app.route('/challs')
def challs():
    if flask_login.current_user.is_authenticated:
         return render_template("challs.html", pwn=pwn)
    else:
         return redirect(url_for('index'))

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
   app.run()
