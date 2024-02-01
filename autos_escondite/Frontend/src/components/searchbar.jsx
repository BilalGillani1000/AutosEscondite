import React, { useState, useEffect } from "react";
import { Form, Button, NavbarOffcanvas } from 'react-bootstrap';
import axios from 'axios';
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return null; // Prefix not found
      }
      node = node.children[char];
    }
    return node;
  }

  getAllSuggestions(node, prefix) {
    
    const suggestions = [];
    this.traverse(node, prefix, suggestions);
    return suggestions;
  }

  traverse(node, currentPrefix, suggestions) {

    if (node.isEndOfWord) {
      suggestions.push(currentPrefix);
    }

    for (const [char, childNode] of Object.entries(node.children)) {
      this.traverse(childNode, currentPrefix + char, suggestions);
    }
  }
}

const SearchBar = () => {
  const navigate=useNavigate();

  const [input, setInput] = useState('');
  const [cars, setCars] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const trie = new Trie();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
      }else {
        const fetchCarsNames = async () => {
          try {
            const response = await axios.get("http://localhost:4000/carnames");
            if(response.data.names){
              // console.log(response.data.names);
              setCars(response.data.names);
            }else{
              console.log("No Names Retrieved");
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchCarsNames();
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (cars) {
      cars.forEach((car) => {
        trie.insert(car.toLowerCase());
      });
    }
  }, [cars, trie]);

  const handleInputChange = (event) => {
    const userInput = event.target.value.toLowerCase();
    setInput(userInput);

    const prefixNode = trie.searchPrefix(userInput);
    const suggestions = prefixNode ? trie.getAllSuggestions(prefixNode, userInput) : [];
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const response=await axios.post("http://localhost:4000/checkInput", {input: input});
    if(response.data.type){
      const type=response.data.type;
      console.log(type);
      if (type === "make") {
        navigate(`/cars/category/${input}`);
      } else if (type === "model"){
        navigate(`/cars/${response.data.carId}`);
      }else {
        console.log(type);
      }
    }else {
      console.log("No Category Retrieved");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className=" d-flex position-relative" style={{width:"70%",marginLeft:"130px"}}>
      <Form.Control
        required
        className=""
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a car brand..."
        autoComplete="off"
      />
      <Button className="btn-sm btn-primary" type="submit" style={{marginLeft:"15px", borderRadius: "8px"}}>
        Search
      </Button>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </Form>
  );
};

export default SearchBar;
