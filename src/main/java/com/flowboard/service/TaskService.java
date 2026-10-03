package com.flowboard.service;

import com.flowboard.model.Task;
import com.flowboard.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        String username = getCurrentUsername();
        return taskRepository.findByAssignedTo(username);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task) {
        String username = getCurrentUsername();
        task.setAssignedTo(username);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updates) {
        Task task = getTaskById(id);
        task.setTitle(updates.getTitle());
        task.setDescription(updates.getDescription());
        task.setStatus(updates.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext()
                .getAuthentication().getName();
    }
}
