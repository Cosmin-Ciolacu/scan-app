import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, TouchableOpacity, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get("screen")
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            parola: ""
        }
    }
    navigationOptions = {
        header: { visible: false }
    }

    login = async () => {
        const obj = new FormData()
        obj.append("email", this.state.email)
        obj.append("parola", this.state.parola)
        if (this.state.email.length === 0 && this.state.parola.length === 0) {
            alert("indroduceti toate datele")
        } else {
            await fetch('http://churchmap.co.ro/api/login.php', {
                method: "POST",
                body: obj
            }).then(res => res.json())
                .then(data => {
                    if (data.succes === 1) {
                        //AsyncStorage.setItem("email", this.state.email)
                        this.props.navigation.navigate('Home')
                    } else {
                        alert("datele sunt invalide")
                    }
                })
                .catch(err => alert("eroare " + err))

        }
    }
    render() {
        return (
            <SafeAreaView style={css.container}>
                <View style={css.titlu}>
                    <Text style={css.text}>Conecteaza-te</Text>
                </View>
                <TextInput
                    style={css.input}
                    placeholder="introdu adresa de email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email: email })}
                />
                <TextInput
                    style={css.input}
                    placeholder="introdu parola"
                    value={this.state.parola}
                    secureTextEntry={true}
                    onChangeText={(parola) => this.setState({ parola: parola })}
                />
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }} onPress={this.login}>
                    <Text style={css.login}>conecteaza-te</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }} onPress={() => this.props.navigation.navigate("Signup")}>
                    <Text style={css.login}>nu ai cont? Creaza unul aici</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
const css = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFBB00',
    },
    titlu: {
        marginBottom: "20%"
    },
    text: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 24,

        textAlign: 'center',
    },
    imput: {
        width: 0.6 * width,
        height: 40,
        fontSize: 24,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: "white"
    },
    login: {
        width: 0.8 * width,
        height: 40,
        textAlign: "center",
        backgroundColor: "#357e97",
        borderRadius: 25,
        fontSize: 25,
        color: 'white'
    }
})
export default Login