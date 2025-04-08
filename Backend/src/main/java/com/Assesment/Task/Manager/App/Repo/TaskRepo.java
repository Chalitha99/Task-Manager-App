package com.Assesment.Task.Manager.App.Repo;

import com.Assesment.Task.Manager.App.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {

}
