import React, { Component } from 'react'
import { Text, View, TextInput, Dimensions, TouchableOpacity, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native'
import { emailValid, parolaValida } from "../functii"
const { width, height } = Dimensions.get("screen")
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            parola: "",
            parola2: ""
        }
    }
    navigationOptions = {
        header: { visible: false }
    }

    signup = async () => {
        console.log(this.state.email, this.state.parola, this.state.parola2)

        if (this.state.email.length == 0 && this.state.parola.length == 0 && this.state.parola2.length == 0) {
            alert("completati toate campurile")
        } else
            if (emailValid(this.state.email)) {
                alert("email invalid")
            } else
                if (parolaValida(this.state.parola)) {
                    alert("parola trebuie sa aiba mai mult de 8 caractere")
                } else
                    if (this.state.parola !== this.state.parola2) {
                        alert("parolele nu coincid")
                    } else {
                        const obj = new FormData()
                        obj.append("email", this.state.email)
                        obj.append("parola", this.state.parola)
                        await fetch('http://churchmap.co.ro/api/signup.php', {
                            method: "POST",
                            body: obj,
                        }).then(res => res.json())
                            .then(data => {
                                if (data.succes === 1) {
                                    //AsyncStorage.setItem("email", this.state.email)
                                    alert("contul a fost creat cu succes")
                                    this.props.navigation.navigate('Login')
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
                    <Text style={css.text}>Creaza-xi contul</Text>
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
                <TextInput
                    style={css.input}
                    placeholder="confirmare parola"
                    value={this.state.parola2}
                    secureTextEntry={true}
                    onChangeText={(parola2) => this.setState({ parola2: parola2 })}
                />
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }} onPress={this.signup}>
                    <Text style={css.login}>creaza cont</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }} onPress={() => this.props.navigation.navigate("Login")}>
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