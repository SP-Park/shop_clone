import { v4 as uuid } from 'uuid'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export function login() {
    signInWithPopup(auth, provider)
    .catch(console.error)
}

export function logout(){
    signOut(auth).catch(console.error)
}

export function onUserChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminuser(user) : null
        callback(updatedUser)
    })
}

async function adminuser(user) {
    return get(ref(db, 'admins'))
    .then((snapshot) => {
        if(snapshot.exists()){
            const admins = snapshot.val()
            const isAdmin = admins.includes(user.uid)
            return { ...user, isAdmin }
        }
        return user
    })
}

export async function addNewProduct(product, imageUrl) {
    const id = uuid()
    return set(ref(db, `product/${id}`), {
        ...product, id, price: parseInt(product.price), image: imageUrl, options: product.options.split(',')
    })
}

export async function getProducts() {
    return get(ref(db, 'product')) 
    .then((snapshot) => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val())
        }
        return []
    })
}

export async function getCart(userId) {
    return get(ref(db, `carts/${userId}`))
    .then((snapshot) => {
        const items = snapshot.val() || {}
        return Object.values(items)
    })
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(db, `carts/${userId}/${product.id} `), product)
} 

// export async function removeFromCart(userId, productId) {
//     console.log(userId, productId)
//     return remove(ref(db, `carts/${userId}/${productId}`))
// }

export async function removeFromCart(userId, productId) {
    return set(ref(db, `carts/${userId}/${productId} `), null)
}