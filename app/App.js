
 import React from 'react';


 let axios = require('axios');
 import react ,{useEffect,useState} from 'react';
 import {
   SafeAreaView,
   TouchableOpacity,
   StatusBar,
   StyleSheet,
  ActivityIndicator,
   TextInput,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';



 const App =() =>  {
   const [ text,setText] = useState('')
   const [ text2,setText2] = useState('')
   const [ sending,setSending] = useState(false)
   useEffect(()=>{
    get_name()
   },[])



// Our Func //
    const  set_name = async(name) =>{ 

	setSending(true)
  var data = JSON.stringify({
    "name": name
  });
      var config = {
        method: 'post',
        url: 'http://localhost:4000/setName',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        get_name()
      	setSending(false)
      })
      .catch(function (error) {
        console.log(error);
       
        setSending(false)
 
      });
    }
    const  get_name = async() =>{ 
      var config = {
        method: 'get',
        url: 'http://localhost:4000/getName',
        headers: { }
      };
      axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.data));
  setText2(JSON.stringify(response.data.data))
})
.catch(function (error) {
  console.log(error);
});


    }
 
   return (
     <SafeAreaView >
 
         <View  style={{justifyContent:'center',alignSelf:'center',marginTop:100}}>
 
         <TextInput
         style={{height: 40}}
         placeholder="Type here to translate!"
         onChangeText={newText => setText(newText)}
         defaultValue={text}
       />
         </View>
        
         <View  style={{justifyContent:'center',alignSelf:'center',marginTop:100}}>
 
          
          <TouchableOpacity 
          onPress={_=>set_name(text)}
           style={{justifyContent:'center',alignContent:'center',backgroundColor:'green',borderRadius:10}}>
             {sending? <ActivityIndicator color={"#ffff"}/>:null}
            <Text style={{padding:20,color:'#ffff'}}>Send to BlockChain</Text>
          </TouchableOpacity>
        </View>

        <View  style={{justifyContent:'center',alignSelf:'center',marginTop:100}}>
 
          
        <Text style={{color:'#000',fontSize:10}}>{text2}</Text>
</View>

     </SafeAreaView>
   );
 };
 

 export default App;
 