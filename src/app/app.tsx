import React, {useRef} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layout";
import {pages} from "./pages";
import {LoginPage} from "./pages/login";
import {EmailInput} from "./components/Inputs/simple_inputs/email_input";
import {Multiselect} from "./components/Inputs/multiinputs/multiselect/multiselect";
import {PhoneInput} from "./components/Inputs/simple_inputs/phone_input";
import {TextInput} from "./components/Inputs/simple_inputs/text_input";
import {Autocomplete} from "./components/Inputs/multiinputs/autocomplete/autocomplete";
import {FilePicker} from "./components/Inputs/file_picker/new_file_picker";
import {KeyValuePair} from "./components/Inputs/base/key_value_pair";
import {InputRef} from "./components/Inputs/base/Input_ref";


export const App: React.FC = () => {
    return <div style={{width: 200}}>
        <FilePicker isRequired label={"FILE"} onValidChange={() => null} multiple/>
        <Autocomplete
            isRequired
            label={"Выбор"}
            items={[
                new KeyValuePair('1', '1'),
                new KeyValuePair('2', '2'),
                new KeyValuePair('3', '3'),
                new KeyValuePair('4', '4'),
                new KeyValuePair('5', '5'),
                new KeyValuePair('6', '6'),
                new KeyValuePair('7', '7'),
                new KeyValuePair('8', '8'),
            ]}
            ref={useRef<InputRef>(null)}
            onValidChange={() => null}
            onAddItem={_ => null}
        />
        <Multiselect
            isRequired
            label={"Выбор"}
            items={[
                new KeyValuePair('1', '1'),
                new KeyValuePair('2', '2'),
                new KeyValuePair('3', '3'),
                new KeyValuePair('4', '4'),
                new KeyValuePair('5', '5'),
                new KeyValuePair('6', '6'),
                new KeyValuePair('7', '7'),
                new KeyValuePair('8', '8'),
            ]}
            ref={useRef<InputRef>(null)}
            onValidChange={() => null}
            onAddItem={_ => null}
        />
        <EmailInput ref={useRef<InputRef>(null)} onValidChange={() => null}/>
        <PhoneInput ref={useRef<InputRef>(null)} onValidChange={() => null}/>
        <TextInput ref={useRef<InputRef>(null)} onValidChange={() => null} label={"Опачки"}/>
    </div>
    /* const token = localStorage.getItem('token');
     const roles = JSON.parse(localStorage.getItem('roles') || '[]');

     return <Routes>
         <Route path="/login" element={<LoginPage/>}/>
         {pages.map(p => (
             <Route
                 key={p.id}
                 path={`/${p.id}`}
                 element={
                     !token ? <Navigate to="/login"/> :
                         !roles.some((r: string) => p.roles.includes(r)) ? <Navigate to="/home"/> :
                             <Layout>{p.page}</Layout>
                 }
             />
         ))}
         <Route path="*" element={<Navigate to="/home"/>}/>
     </Routes>;*/
};