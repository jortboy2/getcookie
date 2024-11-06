import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');

  // Hàm xử lý chuỗi cookie và sắp xếp lại
  const reorderCookie = (cookie) => {
    // Tạo một đối tượng để chứa các giá trị cookie
    const cookieObj = {};
    cookie.split(';').forEach(part => {
      const [key, value] = part.split('=').map(str => str.trim());
      cookieObj[key] = value;
    });

    // Tạo cookie mới với thứ tự giống cookie 2
    const orderedCookie = [
      `c_user=${cookieObj['c_user']}`,
      `ps_n=1`,
      `xs=${cookieObj['xs']}`,
      `dpr=${cookieObj['dpr']}`,
      `wd=${cookieObj['wd']}`,
      `sb=${cookieObj['sb']}`
    ].join('; ');

    return orderedCookie;
  };

  // Xử lý khi nhấn nút "Sắp xếp Cookie"
  const handleProcess = () => {
    const lines = inputText.split('\n'); // Tách từng dòng
    const result = lines.map(line => {
      const [uid, cookie] = line.split('|').map(str => str.trim()); // Tách uid và cookie
      const orderedCookie = reorderCookie(cookie); // Sắp xếp cookie
      return `${uid}|${orderedCookie}`; // Ghép lại uid và cookie đã sắp xếp
    }).join('\n');
    setOutput(result); // Lưu kết quả để hiển thị
  };

  return (
    <div style={styles.container}>
      <h2>Cookie By phong</h2>
      <textarea
        placeholder="Nhập uid|cookie mỗi dòng một cặp..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={handleProcess} style={styles.button}>
        Sắp xếp Cookie
      </button>
      <textarea
        placeholder="Kết quả sắp xếp sẽ hiển thị ở đây..."
        value={output}
        readOnly
        style={styles.textarea}
      />
    </div>
  );
}
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center'
  },
  textarea: {
    width: '100%',
    height: '200px',
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none'
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer'
  }
};

export default App;