import signupUser from "../../modules/firebase/auth/firebase-signup.js";
import { firebaseConfig } from "../../modules/firebase/config/firebase-config.js";
import loginUser from "../../modules/firebase/auth/firebase-login.js";
import {getCurrentUser} from "../../modules/firebase/profile/firebase-profile.js"


const newChatForm = document.querySelector('.message-input-container');
const chatlist = document.querySelector('.chat-list');

const uid = localStorage.getItem('uid');
// GET LOGGED USER DETAILS
const docSnapA = await getDoc(doc(db, "users", uid));
const userData = docSnapA.data();

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

class ChatUI{
  constructor(list){
    this.list = list;
  }
  clear(){
    this.list.innerHTML = '';
  }
  render(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      {addSuffix: true}
    );
    const html = `
    <li class="list-group-item">
      <span class="uid">${data.uid}</span>:
      <span class="message">${data.message}</span><br>
      <span class="time">${when}</div>
    </li>
    `;

    this.list.innerHTML += html;
  }
}

class Chatroom {
  constructor(room, uid){
    this.room = room;
    this.uid = uid;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message){
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      uid: this.uid,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            // update the ui
            callback(change.doc.data())
          }
        })
      })
  }
  updateName(uid){
    this.uid = uid;
    localStorage.setItem('uid', uid);
  }
  updateRoom(room){
    this.room = room;
    console.log('room updated');
    if(this.unsub){
      this.unsub();
    }
  }
}
// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', uid);

// get chats and render
chatroom.getChats(data => chatUI.render(data));

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
})
