var auth = firebase.auth();
var firestore = firebase.firestore();
var nameDiv = document.querySelector(".name h3")


//fetching uid from url 
var uid = location.hash.substring(1,location.hash.length);
// console.log(data.createdAt.toDate().toISOString().split("T")[0]); // date ko samghane k lye jo ajeeb si form me arhi

var fetchUserInfo = async (uid) => {
    try {
        var userInfo = await firestore.collection("users").doc(uid).get();
        return userInfo.data();
    } catch (error) {
        console.log(error);
    }
}

// fetchUserInfo(uid)

//auth listner
auth.onAuthStateChanged( async (user) => {
    if (user) {
        var {uid} = user;
        var userInfo = await fetchUserInfo(uid);
        // setting user info
        nameDiv.textContent = userInfo.fullName;
    } else {
        console.log("user logged out");
    }
})