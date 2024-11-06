'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  subject: string;
  deadline: string;
  completed: boolean;
};

export function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState('deadline');

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      id: Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      subject: formData.get('subject') as string,
      deadline: formData.get('deadline') as string,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    (e.target as HTMLFormElement).reset();
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'subject':
        return a.subject.localeCompare(b.subject);
      default:
        return 0;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addTask} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select name="subject" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" name="deadline" type="date" required />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="medium" name="priority" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button type="submit">Add Task</Button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Sort by:</Label>
            <RadioGroup value={sortBy} onValueChange={setSortBy} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deadline" id="sort-deadline" />
                <Label htmlFor="sort-deadline">Deadline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="priority" id="sort-priority" />
                <Label htmlFor="sort-priority">Priority</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="subject" id="sort-subject" />
                <Label htmlFor="sort-subject">Subject</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start space-x-4 rounded-lg border p-4 ${
                  task.completed ? 'bg-muted' : ''
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="mt-2 flex space-x-4 text-sm text-muted-foreground">
                    <span>Subject: {task.subject}</span>
                    <span>Due: {task.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}