import { useState, useEffect, useCallback, useRef } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import {
  Actions,
  Button,
  Card,
  defaultThemeProp,
  Flex,
  Input,
  Option,
  Select,
  Modal,
  registerIcon,
  AppShell,
  AppShellProps,
  useModalManager,
  useModalContext,
} from "@pega/cosmos-react-core";
import AppHeader from "@pega/cosmos-react-core/lib/components/AppShell/AppHeader";
import {
  StyledList,
  StyledSublistItem,
} from "@pega/cosmos-react-core/lib/components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { updateTask, deleteTask, moveTask } from "./tasksSlice";
import clickUpLogo from "./assets/clickuplogo-whitetext.svg";
import * as homeIcon from "@pega/cosmos-react-core/lib/components/Icon/icons/home.icon";

registerIcon(homeIcon);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${defaultThemeProp.theme.base["font-family"]};
    margin: 0;
  }
`;

const StyledPage = styled.div`
  padding: 0;
  width: 97%;
`;

const StyledTask = styled(StyledList)``;

const StyledTaskList = styled(StyledSublistItem)(() => {
  const {
    gray: { "extra-light": extraLight },
  } = defaultThemeProp.theme.base.colors;

  return css`
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    background-color: ${extraLight};
    box-shadow: 0 2px 10px ${extraLight};
    margin-bottom: 20px;
    width: 500px;
    box-sizing: border-box;
    height: 92vh;
    overflow-x: hidden;
    overflow-y: auto;
  `;
});

const StyledCard = styled(Card)`
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${defaultThemeProp.theme.base.colors.gray.light};
  margin-bottom: 10px;
  background-color: ${defaultThemeProp.theme.base.colors.white};
`;

const TaskTitle = styled.span`
  font-weight: ${defaultThemeProp.theme.base["font-weight"].bold};
  font-size: 16px;
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const StyledTaskName = styled.span((props) => {
  const {
    black,
    white,
    gray: { light: grayLight },
    blue: { light: blueLight },
    green: { medium: greenMedium },
    purple: { medium: purpleMedium },
  } = defaultThemeProp.theme.base.colors;
  let backgroundColor = grayLight;
  let fontColor = white;
  switch (props.status) {
    case "Todo":
      fontColor = black;
      break;
    case "In Progress":
      backgroundColor = blueLight;
      break;
    case "Complete":
      backgroundColor = greenMedium;
      break;
    case "Review":
      backgroundColor = purpleMedium;
      break;
    case "Close":
      backgroundColor = greenMedium;
      break;
    case "Open":
      fontColor = black;
      break;
  }
  return css`
    background-color: ${backgroundColor};
    color: ${fontColor};
    box-sizing: border-box;
  `;
});

const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const Board = () => {
  const dispatch = useDispatch();
  const statuses = useSelector((state: RootState) => state.tasks.statuses);
  const [movingTask, setMovingTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { create } = useModalManager();

  const modalCreatedRef = useRef(false);

  const handleMoveTask = (task) => {
    setMovingTask(task);
    if (!task) {
      console.error("Task not found");
      return;
    }
    setNewStatus(task.status);
  };

  const handleUpdateTask = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
  };

  const handleSaveTask = useCallback(() => {
    if (movingTask) {
      dispatch(moveTask({ id: movingTask.id, newStatus }));
      setMovingTask(null);
      setNewStatus("");
    }
    if (editingTask) {
      const updatedTask = { ...editingTask, title: newTitle };
      dispatch(updateTask(updatedTask));
      setEditingTask(null);
      setNewTitle("");
    }
    console.log("dismiss start handle");
    console.log("dismiss end handle");
  }, [movingTask, editingTask, newStatus, newTitle, dispatch]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const editUpdateModal = useCallback(() => {
    console.log("editUpdateModal");
    const { dismiss } = useModalContext();

    // useEffect(() => {
    //   if (movingTask) {
    //     console.log("Setting initial value for newStatus:", movingTask.status);
    //     setNewStatus(movingTask.status);
    //   }
    // }, [movingTask]);
    //
    // useEffect(() => {
    //   if (editingTask) {
    //     console.log("Setting initial value for newTitle:", editingTask.title);
    //     setNewTitle(editingTask.title);
    //   }
    // }, [editingTask]);

    const actions = (
        <>
          <Button
              onClick={() => {
                setEditingTask(null);
                setMovingTask(null);
                console.log("dismiss start close");
                dismiss();
                console.log("dismiss end close");
              }}
          >
            Close
          </Button>
          <Button
              onClick={() => {
                handleSaveTask();
                setEditingTask(null);
                setMovingTask(null);
                console.log("dismiss start save");
                dismiss();
                console.log("dismiss end save");
              }}
          >
            Save
          </Button>
        </>
    );
    if (movingTask) {
      return (
          <Modal
              actions={actions}
              heading="Move Task"
              dismissible={true}
              onAfterOpen={() => {
                if (movingTask) {
                  setNewStatus(movingTask.status);
                }
              }}
              onRequestDismiss={() => {
                setMovingTask(null);
                console.log("onRequestDismiss start edit");
                dismiss();
                console.log("onRequestDismiss end edit");
                return true;
              }}
          >
            <Select
                defaultValue={newStatus}
                onChange={(e) => {
                  console.log("Updating newStatus:", e.target.value);
                  setNewStatus(e.target.value);
                  // dismiss();
                }}
            >
              {statuses.map((status) => (
                  <Option key={status.id} value={status.title}>
                    {status.title}
                  </Option>
              ))}
            </Select>
          </Modal>
      );
    } else if (editingTask) {
      return (
          <Modal
              actions={actions}
              heading="Edit Task"
              dismissible={true}
              // onAfterOpen={() => {
              //   if (editingTask) {
              //     console.log(
              //         "Setting initial value for newTitle:",
              //         editingTask.title,
              //     );
              //     setNewTitle(editingTask.title);
              //   }
              // }}
              onRequestDismiss={() => {
                setEditingTask(null);
                console.log("onRequestDismiss start edit");
                dismiss();
                console.log("onRequestDismiss end edit");
                return true;
              }}
          >
            <Input
                type="text"
                defaultValue={newTitle}
                onChange={(e) => {
                  console.log("Updating newTitle:", e.target.value);
                  setNewTitle(e.target.value);
                  // dismiss();
                }}
            />
          </Modal>
      );
    }

    return null;
  }, [handleSaveTask, movingTask, editingTask, newStatus, newTitle, statuses]);

  // useEffect(() => {
  //   if (editingTask && !modalCreatedRef.current) {
  //     console.log("Setting initial value for newTitle:", editingTask.title);
  //     setNewTitle(editingTask.title);
  //   }
  // }, [editingTask]);

  useEffect(() => {
    console.log("useEffect");
    if (
        (movingTask || editingTask)
         // &&
        // !document.querySelector('[aria-modal="true"]')
        // !modalCreatedRef.current
    ) {
      console.log("useEffect if");
      create(editUpdateModal, { dismissible: true });
      // modalCreatedRef.current = true;
    }
  }, [movingTask, editingTask]);

  const handleDropdownSelect = (action, task) => {
    console.log("handleDropdownSelect");
    if (action === "move") {
      console.log("handleDropdownSelect move");
      handleMoveTask(task);
    } else if (action === "update") {
      console.log("handleDropdownSelect update");
      handleUpdateTask(task);
    } else if (action === "delete") {
      handleDeleteTask(task.id);
    }
  };

  const MainLinks: AppShellProps["links"] = [
    {
      id: "01",
      name: "",
      href: "/",
      icon: "home",
      active: true,
    },
  ];

  const MainContent = (
      <Flex container={{ direction: "row" }}>
        <StyledPage>
          <Flex as={StyledTask} container={{ direction: "row" }}>
            {statuses.map((status, statusIndex) => (
                <Flex
                    as={StyledTaskList}
                    container={{ direction: "column" }}
                    key={statusIndex}
                >
                  <StyledTaskName status={status.title}>
                    {status.title}
                  </StyledTaskName>
                  {status.tasks.map((task, index) => {
                    const actions = [
                      {
                        id: "move",
                        text: "Move",
                        onClick: () => handleDropdownSelect("move", task),
                      },
                      {
                        id: "update",
                        text: "Update",
                        onClick: () => handleDropdownSelect("update", task),
                      },
                      {
                        id: "delete",
                        text: "Delete",
                        onClick: () => handleDropdownSelect("delete", task),
                      },
                    ];
                    return (
                        <Card as={StyledCard} key={`${statusIndex}-${index}`}>
                          <TaskTitle>{task.title}</TaskTitle>
                          <TaskDetails>
                            <span>{task.assignedTo}</span>
                            <StatusTag>{task.status}</StatusTag>
                            <Actions items={actions} />
                          </TaskDetails>
                        </Card>
                    );
                  })}
                </Flex>
            ))}
          </Flex>
        </StyledPage>
      </Flex>
  );

  const MainHeader = (
      <AppHeader
          appName=""
          imageSrc={clickUpLogo}
          operator={{ actions: [] }}
          searchInput={<Input type="text" placeholder="Search..." />}
      />
  );

  return (
      <>
        <GlobalStyle />
        <AppShell
            appInfo={{ appName: "", imageSrc: clickUpLogo }}
            main={MainContent}
            operator={{ actions: [] }}
            searchInput={<Input type="text" placeholder="Search..." />}
            appHeader={MainHeader}
            links={MainLinks}
        />
      </>
  );
};

export default Board;
