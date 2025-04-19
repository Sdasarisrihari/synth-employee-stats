
create or replace function get_department_stats()
returns table (
  department text,
  employeeCount bigint,
  averageSalary numeric,
  averagePerformance numeric
) language sql as $$
  select 
    department,
    count(*) as employeeCount,
    round(avg(salary)::numeric, 2) as averageSalary,
    round(avg(performance_score)::numeric, 2) as averagePerformance
  from employees
  group by department
  order by employeeCount desc;
$$;
