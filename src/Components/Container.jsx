import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = () => {

  const [languages, setLanguages] = useState([]);
  const [from, setFrom] = useState('en');
  const [to, setTo] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    axios.get('https://libretranslate.com/languages',
      { headers: { 'accept': 'application/json' } })
      .then((res) => setLanguages(res.data))
  }, [])

  const translate = () => {
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '71baa65e6emsh30f4a5d4a4a1579p12ba90jsne87e97695b8d',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      params: {
        q: input,
        source: from,
        target: to
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.data.translations[0].translatedText);
      setOutput(response.data.data.translations[0].translatedText);
    }).catch(function (error) {
      console.error(error);
    });
  };



  return (
    <>
      <div className="from-to">

        <label htmlFor="from" id="froml"><span>From:({from})</span>
          <select name="from" id="from" onChange={e => setFrom(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </label>

        <label htmlFor="to" id="tol"><span>To:({to})</span>
          <select name="to" id="to" onChange={e => setTo(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </label>

      </div>

      <div className="boxes">
        <textarea name="fromarea" id="fromarea" cols="60" rows="8" onInput={(e) => setInput(e.target.value)}></textarea>
        <textarea name="toarea" id="toarea" cols="60" rows="8" value={output}></textarea>
      </div>

      <button className='btn' onClick={translate}>Translate</button>
    </>
  )
}

export default Container
