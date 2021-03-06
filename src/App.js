import { Nav } from "./components/Nav/Nav";
import { Btn } from "./components/Button/Btn";
import { BodyWrapper } from "./components/BodyWrapper/BodyWrapper";
import { FormInput } from "./components/FormInput/FormInput";
import {
  FlexColumnStart,
  ItemRecipe,
  PreviewImg,
  MarginLeft60,
} from "./components/Global";
import { Row } from "react-bootstrap";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import React, { useState } from "react";
import { useRecipesContext } from "./components/store/context";
import { DetailItem } from "./DetailItem/DetailItem";

function App() {
  const recipesCtx = useRecipesContext();

  return (
    <div className="App">
      <header>
        <Nav></Nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" />}></Route>
          <Route
            path="/recipes"
            element={
              <BodyWrapper>
                <Row style={{ width: "100%", margin: "0" }}>
                  <div className="col-md-6">
                    <MarginLeft60>
                      <Link to="form">
                        <Btn isSuccess={true}>New Recipe</Btn>
                      </Link>
                      {recipesCtx.recipe.map((element, index) => {
                        return (
                          <FlexColumnStart
                            key={index}
                            style={{ marginTop: "20px" }}
                          >
                            <div
                              style={{
                                border: "1px solid #ccc",
                                width: "80%",
                              }}
                            >
                              <ItemRecipe
                                onClick={() => {
                                  recipesCtx.setDetailShowing(true);
                                  recipesCtx.setNumber(index);
                                }}
                              >
                                <FlexColumnStart>
                                  <h3>{element.name}</h3>
                                  <p>{element.description}</p>
                                </FlexColumnStart>
                                <PreviewImg>
                                  <img
                                    alt="Preview"
                                    src="NYC-Pizza-Hanoi-NYC-Pizza-Hanoi-1-1024x1024.jpeg"
                                    style={{ height: "100%" }}
                                  ></img>
                                </PreviewImg>
                              </ItemRecipe>
                            </div>
                          </FlexColumnStart>
                        );
                      })}
                    </MarginLeft60>
                  </div>
                  <Outlet></Outlet>
                </Row>
              </BodyWrapper>
            }
          >
            <Route
              path="form"
              element={
                <div className="col-md-6">
                  <FormInput></FormInput>
                </div>
              }
            />

            <Route
              path=""
              element={
                <div className="col-md-6">
                  {!recipesCtx.detailShowing && (
                    <h2>Please select a Recipe!</h2>
                  )}
                  {recipesCtx.detailShowing && <DetailItem />}
                </div>
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
