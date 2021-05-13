import React, { useState } from "react";

export default function Pagination(props) {
  return (
    <div className="pagination">
      <ul class="pagination">
        <li onClick={() => props.previousPage()}>
          <a href="#0">&lt;</a>
        </li>
        <li>
          <a class="active" href="#0">
            1
          </a>
        </li>
        <li>
          <a href="#0">2</a>
        </li>
        <li>
          <a href="#0">3</a>
        </li>
        <li>
          <a href="#0">4</a>
        </li>
        <li onClick={() => props.nextPage()}>
          <a>&gt;</a>
        </li>
      </ul>
    </div>
  );
}
